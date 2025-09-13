import { storageKeys } from '@/shared/config/storageKeys';
import AuthService from '@/features/Auth/services/login';
import  { httpClient } from '@/shared/api/httpClient';

import { createContext, useCallback, useLayoutEffect, useState } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

// Removido a desestruturação para evitar problemas de inicialização

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });

  useLayoutEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Add request interceptor');

    const interceptorId = httpClient.getAxiosInstance().interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-console
        console.log(config.url);

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
    // eslint-disable-next-line no-console
    console.log('Add response interceptor');

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
    try {
      const { accessToken, refreshToken } = await AuthService.signIn({
        email,
        password,
      });
  
      localStorage.setItem(storageKeys.accessToken, accessToken);
      localStorage.setItem(storageKeys.refreshToken, refreshToken);
  
      setSignedIn(true);
    } catch (error) {
      throw error;
    }    
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const value: IAuthContextValue = {
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
