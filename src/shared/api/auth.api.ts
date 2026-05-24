import { apiClient, unwrap } from './client';
import { tokenStore } from './token-store';
import type { AuthTokensDto, LoginDto, RegisterDto, UserDto } from './types';

export const authApi = {
  register: async (dto: RegisterDto) => {
    const res = await apiClient.post<{ data: AuthTokensDto }>('/auth/register', dto);
    const tokens = unwrap(res);
    tokenStore.setAccessToken(tokens.accessToken);
    tokenStore.setRefreshToken(tokens.refreshToken);
    return tokens;
  },

  login: async (dto: LoginDto) => {
    const res = await apiClient.post<{ data: AuthTokensDto }>('/auth/login', dto);
    const tokens = unwrap(res);
    tokenStore.setAccessToken(tokens.accessToken);
    tokenStore.setRefreshToken(tokens.refreshToken);
    return tokens;
  },

  refresh: async () => {
    const refreshToken = tokenStore.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    const res = await apiClient.post<{ data: AuthTokensDto }>('/auth/refresh', { refreshToken });
    const tokens = unwrap(res);
    tokenStore.setAccessToken(tokens.accessToken);
    tokenStore.setRefreshToken(tokens.refreshToken);
    return tokens;
  },

  me: async () => {
    const res = await apiClient.get<{ data: UserDto }>('/auth/me');
    return unwrap(res);
  },

  logout: () => {
    tokenStore.clear();
  },
};
