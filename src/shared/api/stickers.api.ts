import { apiClient, unwrap } from './client';
import type { EligibilityDto, StickerDto, UserStickerDto } from './types';

export const stickersApi = {
  getById: async (id: string) => {
    const res = await apiClient.get<{ data: StickerDto }>(`/bff/stickers/${id}`);
    return unwrap(res);
  },

  getCatalogById: async (id: string) => {
    const res = await apiClient.get<{ data: StickerDto }>(`/stickers/${id}`);
    return unwrap(res);
  },

  claim: async (id: string) => {
    const res = await apiClient.post<{ data: UserStickerDto }>(`/stickers/${id}/claim`);
    return unwrap(res);
  },

  eligibility: async (id: string) => {
    const res = await apiClient.get<{ data: EligibilityDto }>(`/stickers/${id}/eligibility`);
    return unwrap(res);
  },
};
