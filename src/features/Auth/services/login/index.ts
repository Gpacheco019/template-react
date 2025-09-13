import { httpClient, ApiResponse } from '@/shared/api/httpClient';

// Tipos para o login
export interface LoginRequest {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {  
  async signIn(credentials: LoginRequest): Promise<ISignInResponse> {
    const response = await httpClient.post<ISignInResponse>('/signin', credentials);

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  }
  
  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post('/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<ISignInResponse> {
    const response = await httpClient.post<ISignInResponse>('/refresh-token', { refreshToken });
    return response.data;
  }
}

export default new AuthService();