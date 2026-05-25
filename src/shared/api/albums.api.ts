import { apiClient, unwrap } from './client';
import type { AlbumDto } from './types';

export const albumsApi = {
  list: async () => {
    const res = await apiClient.get<{ data: AlbumDto[] }>('/albums');
    return unwrap(res);
  },

  getByIdOrSlug: async (idOrSlug: string) => {
    const res = await apiClient.get<{ data: AlbumDto }>(`/albums/${idOrSlug}`);
    return unwrap(res);
  },

  listStickers: async (idOrSlug: string) => {
    const res = await apiClient.get<{ data: import('./types').StickerDto[] }>(
      `/albums/${idOrSlug}/stickers`,
    );
    return unwrap(res);
  },
};
