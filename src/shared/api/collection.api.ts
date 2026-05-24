import { apiClient, unwrap } from './client';
import type { ProfileDto, RankingEntryDto, UserStickerDto } from './types';

export const collectionApi = {
  getCollection: async () => {
    const res = await apiClient.get<{ data: UserStickerDto[] }>('/me/collection');
    return unwrap(res);
  },

  getProfile: async () => {
    const res = await apiClient.get<{ data: ProfileDto }>('/me/profile');
    return unwrap(res);
  },

  getRanking: async (albumId: string) => {
    const res = await apiClient.get<{ data: RankingEntryDto[] }>(`/me/ranking/${albumId}`);
    return unwrap(res);
  },
};
