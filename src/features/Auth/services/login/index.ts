import { httpClient, ApiResponse } from '@/shared/api/httpClient';

// Tipos para o login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  // Método para signIn (alias para login)
  async signIn(credentials: LoginRequest): Promise<ISignInResponse> {
    const response = await httpClient.post<LoginResponse>('/signin', credentials);
    return {
      accessToken: response.data.token,
      refreshToken: response.data.token, // Ajuste conforme sua API
    };
  }

  // Método para logout (se necessário)
  async logout(): Promise<ApiResponse<void>> {
    return httpClient.post('/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<ISignInResponse> {
    const response = await httpClient.post<ISignInResponse>('/refresh-token', { refreshToken });
    return response.data;
  }
}

export default new AuthService();