import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthProvider } from './AuthContext';
import { useAuth } from '@/shared/hooks/useAuth/useAuth';
import { WebStorage } from '@/shared/utils/webStorage/WebStorage';
import { envConfig } from '@/shared/config';
import { storageKeys } from '@/shared/config/storageKeys';
import { httpClient } from '@/shared/api/httpClient';

// Mock do hook de serviço (react-query) para controlar o fluxo do signIn
vi.mock('@/features/Auth/hooks/useServiceAuth/useAuthService', () => {
  return {
    useSignIn: () => ({
      mutateAsync: vi.fn(async (_vars: any, opts?: any) => {
        const response = { accessToken: 'acc-mock', refreshToken: 'ref-mock' };
        if (opts?.onSuccess) {
          await opts.onSuccess(response);
        }
        return response;
      }),
      isPending: false,
      error: null,
    }),
  };
});

// Mock do AuthService apenas para o fluxo de refresh token do interceptor de resposta
vi.mock('@/features/Auth/services/login', async importOriginal => {
  const actual = await importOriginal<any>();
  return {
    __esModule: true,
    ...actual,
    default: {
      ...actual.default,
      refreshToken: vi.fn(async (_rt: string) => ({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      })),
    },
  };
});

const Consumer: React.FC = () => {
  const { signedIn, signIn, signOut, isSignInPending } = useAuth();
  return (
    <div>
      <span data-testid='signed-in'>{String(signedIn)}</span>
      <span data-testid='is-pending'>{String(isSignInPending)}</span>
      <button onClick={() => signIn('john@doe.com', '123456')}>signin</button>
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
};

const createStorage = () => new WebStorage(envConfig.encryptionKey);

describe('AuthContext integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('mounts with existing token and marks signedIn=true', async () => {
    const storage = createStorage();
    await storage.setEncryptedItem(storageKeys.accessToken, 'existing-token');

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('signed-in').textContent).toBe('true');
    });
  });

  it('signIn saves tokens and updates state', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('signed-in').textContent).toBe('false');
    await userEvent.click(screen.getByText('signin'));

    await waitFor(() => {
      expect(screen.getByTestId('signed-in').textContent).toBe('true');
    });

    const storage = createStorage();
    await expect(
      storage.getEncryptedItem<string>(storageKeys.accessToken)
    ).resolves.toBe('acc-mock');
    await expect(
      storage.getEncryptedItem<string>(storageKeys.refreshToken)
    ).resolves.toBe('ref-mock');
  });

  it('signOut clears tokens and marks signedIn=false', async () => {
    const storage = createStorage();
    await storage.setEncryptedItem(storageKeys.accessToken, 'acc');
    await storage.setEncryptedItem(storageKeys.refreshToken, 'ref');

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('signed-in').textContent).toBe('true');
    });

    await userEvent.click(screen.getByText('signout'));

    await waitFor(() => {
      expect(screen.getByTestId('signed-in').textContent).toBe('false');
    });

    await expect(
      storage.getEncryptedItem<string>(storageKeys.accessToken)
    ).resolves.toBeNull();
    await expect(
      storage.getEncryptedItem<string>(storageKeys.refreshToken)
    ).resolves.toBeNull();
  });

  it('request interceptor adds Authorization when there is a token', async () => {
    const storage = createStorage();
    await storage.setEncryptedItem(storageKeys.accessToken, 'abc123');

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const axiosInstance = httpClient.getAxiosInstance();
    const requestInterceptors = (axiosInstance.interceptors.request as any)
      .handlers as Array<any>;
    expect(requestInterceptors.length).toBeGreaterThan(0);
    const last = requestInterceptors[requestInterceptors.length - 1];
    expect(last.fulfilled).toBeInstanceOf(Function);

    const headersSet = vi.fn();
    const cfg = await last.fulfilled({ headers: { set: headersSet } });
    expect(headersSet).toHaveBeenCalledWith('Authorization', 'Bearer abc123');
    expect(cfg).toBeTruthy();
  });

  it('response interceptor refreshes on 401 and makes the request again', async () => {
    const storage = createStorage();
    await storage.setEncryptedItem(storageKeys.refreshToken, 'refresh-old');

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    const axiosInstance = httpClient.getAxiosInstance();
    const responseInterceptors = (axiosInstance.interceptors.response as any)
      .handlers as Array<any>;
    expect(responseInterceptors.length).toBeGreaterThan(0);
    const last = responseInterceptors[responseInterceptors.length - 1];
    expect(last.rejected).toBeInstanceOf(Function);

    // Mocka o getAxiosInstance para o retry não fazer chamada real
    const mockedRequestFn = vi
      .fn()
      .mockResolvedValueOnce({ data: {}, status: 200 });
    vi.spyOn(httpClient, 'getAxiosInstance').mockReturnValueOnce(
      Object.assign(mockedRequestFn, {
        interceptors: {
          request: { use: vi.fn(), eject: vi.fn(), handlers: [] },
          response: { use: vi.fn(), eject: vi.fn(), handlers: [] },
        },
      }) as any
    );

    const error = {
      config: { url: '/some', method: 'GET' },
      response: { status: 401 },
    };

    await last.rejected(error);

    expect(mockedRequestFn).toHaveBeenCalled();

    await expect(
      storage.getEncryptedItem<string>(storageKeys.accessToken)
    ).resolves.toBe('new-access-token');
    await expect(
      storage.getEncryptedItem<string>(storageKeys.refreshToken)
    ).resolves.toBe('new-refresh-token');
  });
});
