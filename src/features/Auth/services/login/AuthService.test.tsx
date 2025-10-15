// tests/authService.int.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthService, { LoginRequest } from '.';
import { httpClient } from '@/shared/api/httpClient';

vi.mock('@/shared/api/httpClient', () => {
  return {
    httpClient: {
      post: vi.fn(),
    },
  };
});

describe('AuthService (integration with httpClient)', () => {
  const mockPost = httpClient.post as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should make login and return tokens', async () => {
    const credentials: LoginRequest = {
      email: 'test@mail.com',
      password: '123456',
    };

    mockPost.mockResolvedValueOnce({
      data: { accessToken: 'fake-access', refreshToken: 'fake-refresh' },
    });

    const result = await AuthService.signIn(credentials);

    expect(mockPost).toHaveBeenCalledWith('/signin', credentials);
    expect(result).toEqual({
      accessToken: 'fake-access',
      refreshToken: 'fake-refresh',
    });
  });

  it('should make logout calling the right route', async () => {
    mockPost.mockResolvedValueOnce({ data: undefined });

    const result = await AuthService.logout();

    expect(mockPost).toHaveBeenCalledWith('/auth/logout');
    expect(result).toEqual({ data: undefined });
  });

  it('should send the refresh token and return the new tokens', async () => {
    mockPost.mockResolvedValueOnce({
      data: { accessToken: 'new-access', refreshToken: 'new-refresh' },
    });

    const result = await AuthService.refreshToken('old-refresh');

    expect(mockPost).toHaveBeenCalledWith('/refresh-token', {
      refreshToken: 'old-refresh',
    });
    expect(result).toEqual({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
    });
  });
});
