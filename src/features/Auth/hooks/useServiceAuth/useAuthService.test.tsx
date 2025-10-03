import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSignIn } from './useAuthService';
import AuthService from '../../services/login';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 0 },
      mutations: { retry: 0 },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

describe('useSignIn (integration with AuthService)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve with tokens and set success state when AuthService.signIn succeeds', async () => {
    const tokens = { accessToken: 'access', refreshToken: 'refresh' };
    vi.spyOn(AuthService, 'signIn').mockResolvedValue(tokens);

    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(false);

    await act(async () => {
      const data = await result.current.mutateAsync({
        email: 'user@mail.com',
        password: '123456',
      });
      expect(data).toEqual(tokens);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(tokens);
      expect(result.current.error).toBeNull();
    });

    expect(AuthService.signIn).toHaveBeenCalledWith({
      email: 'user@mail.com',
      password: '123456',
    });
  });

  it('should expose error state when AuthService.signIn rejects', async () => {
    const err = new Error('Invalid credentials');
    vi.spyOn(AuthService, 'signIn').mockRejectedValue(err);

    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await expect(
        result.current.mutateAsync({
          email: 'user@mail.com',
          password: 'wrong',
        })
      ).rejects.toThrow('Invalid credentials');
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeInstanceOf(Error);
      expect((result.current.error as Error).message).toBe(
        'Invalid credentials'
      );
      expect(result.current.data).toBeUndefined();
    });

    expect(AuthService.signIn).toHaveBeenCalledWith({
      email: 'user@mail.com',
      password: 'wrong',
    });
  });
});
