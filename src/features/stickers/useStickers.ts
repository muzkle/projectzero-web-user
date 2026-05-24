import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stickersApi } from '@/shared/api/stickers.api';

export function useSticker(id: string) {
  return useQuery({
    queryKey: ['stickers', id],
    queryFn: () => stickersApi.getById(id),
    enabled: !!id,
  });
}

export function useStickerEligibility(id: string, enabled = true) {
  return useQuery({
    queryKey: ['stickers', id, 'eligibility'],
    queryFn: () => stickersApi.eligibility(id),
    enabled: !!id && enabled,
  });
}

export function useClaimSticker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stickersApi.claim(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['stickers', id] });
      queryClient.invalidateQueries({ queryKey: ['collection'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
