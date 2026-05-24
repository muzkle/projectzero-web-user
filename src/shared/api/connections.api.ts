import { apiClient, unwrap } from './client';
import type { AuthorizeResponse, ConnectionDto } from './types';

export const connectionsApi = {
  list: async () => {
    const res = await apiClient.get<{ data: ConnectionDto[] }>('/connections');
    return unwrap(res);
  },

  authorizeSpotify: async () => {
    const res = await apiClient.get<{ data: AuthorizeResponse }>('/connections/spotify/authorize');
    return unwrap(res);
  },

  authorizeSteam: async () => {
    const res = await apiClient.get<{ data: AuthorizeResponse }>('/connections/steam/authorize');
    return unwrap(res);
  },
};
