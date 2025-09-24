import { createContext, useCallback, useLayoutEffect, useState } from 'react';

import { storageKeys } from '@/shared/config/storageKeys';
import AuthService from '@/features/Auth/services/login';
import  { httpClient } from '@/shared/api/httpClient';

import { useSignIn } from '../hooks/useServiceAuth/useAuthService';
import { WebStorage } from '@/shared/utils/webStorage/WebStorage';
import { envConfig } from '@/shared/config';

interface IAuthContextValue {
  isSignInPending: boolean;
  signInError: Error | null;
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const secureStorage = new WebStorage(envConfig.encryptionKey);
export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: signInMutation, isPending: isSignInPending, error: signInError } = useSignIn();
  const [signedIn, setSignedIn] = useState(false);
 
  useLayoutEffect(() => {
    const interceptorId = httpClient.getAxiosInstance().interceptors.request.use(
      async (config) => {      

        const accessToken = await secureStorage.getEncryptedItem<string>(storageKeys.accessToken);

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
        
        const refreshToken = await secureStorage.getEncryptedItem<string>(storageKeys.refreshToken);

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
        
        await secureStorage.setEncryptedItem(storageKeys.accessToken, accessToken);
        await secureStorage.setEncryptedItem(storageKeys.refreshToken, newRefreshToken);

        return httpClient.getAxiosInstance()(originalRequest);
      }
    );

    return () => {
      httpClient.getAxiosInstance().interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {

    await signInMutation({ email, password }, {
      onSuccess: async (response) => {        
        await secureStorage.setEncryptedItem(storageKeys.accessToken, response.accessToken);
        await secureStorage.setEncryptedItem(storageKeys.refreshToken, response.refreshToken);
        setSignedIn(true);
        return;
      },
      onError: (error) => {
        return error;
      }
    });
    
  }, [signInMutation]);

  const signOut = useCallback(async () => {
    localStorage.clear();
    await secureStorage.removeItem(storageKeys.accessToken);
    await secureStorage.removeItem(storageKeys.refreshToken);
    setSignedIn(false);
  }, []);

  useLayoutEffect(() => {
    let isMounted = true;
  
    (async () => {
      const accessToken = await secureStorage.getEncryptedItem<string>(storageKeys.accessToken);
      if (isMounted && accessToken) {
        setSignedIn(true);
      }
    })();
  
    return () => { isMounted = false; };
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
