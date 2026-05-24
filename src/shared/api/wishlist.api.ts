import { apiClient, unwrap } from './client';
import type { WishlistItemDto } from './types';

export const wishlistApi = {
  list: async () => {
    const res = await apiClient.get<{ data: WishlistItemDto[] }>('/me/wishlist');
    return unwrap(res);
  },

  add: async (stickerId: string) => {
    const res = await apiClient.post<{ data: WishlistItemDto }>('/me/wishlist', { stickerId });
    return unwrap(res);
  },

  remove: async (stickerId: string) => {
    await apiClient.delete(`/me/wishlist/${stickerId}`);
  },
};
