import { storageKeys } from '@/shared/config/storageKeys';
import AuthService from '@/features/Auth/services/login';
import  { httpClient } from '@/shared/api/httpClient';

import { createContext, useCallback, useLayoutEffect, useState } from 'react';
import { useSignIn } from '../hooks/useServiceAuth/useAuthService';

interface IAuthContextValue {
  isSignInPending: boolean;
  signInError: Error | null;
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: signInMutation, isPending: isSignInPending, error: signInError } = useSignIn();
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });
 
  useLayoutEffect(() => {
    const interceptorId = httpClient.getAxiosInstance().interceptors.request.use(
      (config) => {      

        const accessToken = localStorage.getItem(storageKeys.accessToken);

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return config;
      },
    );

    return () => {
      httpClient.getAxiosInstance().interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.getAxiosInstance().interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        if (originalRequest.url === '/refresh-token') {
          setSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if (error.response?.status !== 401 || !refreshToken) {
          return Promise.reject(error);
        }

        const {
          accessToken,
          refreshToken: newRefreshToken
        } = await AuthService.refreshToken(refreshToken);

        localStorage.setItem(storageKeys.accessToken, accessToken);
        localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

        return httpClient.getAxiosInstance()(originalRequest);
      }
    );

    return () => {
      httpClient.getAxiosInstance().interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {

    await signInMutation({ email, password }, {
      onSuccess: (response) => {
        localStorage.setItem(storageKeys.accessToken, response.accessToken);
        localStorage.setItem(storageKeys.refreshToken, response.refreshToken);
        setSignedIn(true);
        return;
      },
      onError: (error) => {
        return error;
      }
    });
    
  }, [signInMutation]);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const value: IAuthContextValue = {
    signInError,
    isSignInPending,
    signedIn,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
