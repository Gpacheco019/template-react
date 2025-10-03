import axios, { AxiosInstance } from 'axios';
import { envConfig } from '../config';

// Tipos simplificados
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: envConfig.baseAPIUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const httpClient = {
  async get<T = unknown>(url: string): Promise<ApiResponse<T>> {
    const response = await axiosInstance.get(url);
    return {
      data: response.data,
      status: response.status,
    };
  },

  async post<T = unknown>(
    url: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const response = await axiosInstance.post(url, data);
    return {
      data: response.data,
      status: response.status,
    };
  },

  async put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await axiosInstance.put(url, data);
    return {
      data: response.data,
      status: response.status,
    };
  },

  async delete<T = unknown>(url: string): Promise<ApiResponse<T>> {
    const response = await axiosInstance.delete(url);
    return {
      data: response.data,
      status: response.status,
    };
  },

  // Método para acessar a instância do Axios (para interceptors)
  getAxiosInstance(): AxiosInstance {
    return axiosInstance;
  },
};
