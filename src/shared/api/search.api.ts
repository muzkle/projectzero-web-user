import { apiClient, unwrap } from './client';
import type { AlbumDto, StickerDto } from './types';

export interface SearchResultDto {
  albums: AlbumDto[];
  stickers: StickerDto[];
}

export const searchApi = {
  search: async (q: string, limit = 20) => {
    const res = await apiClient.get<{ data: SearchResultDto }>('/search', {
      params: { q, limit },
    });
    return unwrap(res);
  },
};
