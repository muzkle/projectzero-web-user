import { useQuery } from '@tanstack/react-query';
import { collectionApi } from '@/shared/api/collection.api';

export function useCollection(enabled = true) {
  return useQuery({
    queryKey: ['collection'],
    queryFn: collectionApi.getCollection,
    enabled,
  });
}

export function useProfile(enabled = true) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: collectionApi.getProfile,
    enabled,
  });
}

export function useAlbumRanking(albumId: string, enabled = true) {
  return useQuery({
    queryKey: ['ranking', albumId],
    queryFn: () => collectionApi.getRanking(albumId),
    enabled: !!albumId && enabled,
  });
}
