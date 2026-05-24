import { useQuery } from '@tanstack/react-query';
import { albumsApi } from '@/shared/api/albums.api';

export function useAlbums() {
  return useQuery({
    queryKey: ['albums'],
    queryFn: albumsApi.list,
  });
}

export function useAlbum(idOrSlug: string) {
  return useQuery({
    queryKey: ['albums', idOrSlug],
    queryFn: () => albumsApi.getByIdOrSlug(idOrSlug),
    enabled: !!idOrSlug,
  });
}
