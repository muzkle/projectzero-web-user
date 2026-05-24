import { apiClient, unwrap } from './client';
import type { CreatePurchaseResponse, PurchaseDto } from './types';

export const purchasesApi = {
  create: async (stickerId: string) => {
    const res = await apiClient.post<{ data: CreatePurchaseResponse }>('/purchases', { stickerId });
    return unwrap(res);
  },

  getById: async (id: string) => {
    const res = await apiClient.get<{ data: PurchaseDto }>(`/purchases/${id}`);
    return unwrap(res);
  },
};
