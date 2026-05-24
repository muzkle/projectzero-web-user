import { useMutation, useQuery } from '@tanstack/react-query';
import { purchasesApi } from '@/shared/api/purchases.api';

export function useCreatePurchase() {
  return useMutation({
    mutationFn: (stickerId: string) => purchasesApi.create(stickerId),
  });
}

export function usePurchase(id: string, enabled = false) {
  return useQuery({
    queryKey: ['purchases', id],
    queryFn: () => purchasesApi.getById(id),
    enabled: !!id && enabled,
    refetchInterval: enabled ? 3000 : false,
  });
}
