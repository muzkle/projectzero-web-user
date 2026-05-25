import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/shared/api/search.api';

export function useSearch(q: string, enabled = true) {
  const term = q.trim();
  return useQuery({
    queryKey: ['search', term],
    queryFn: () => searchApi.search(term),
    enabled: enabled && term.length >= 2,
    staleTime: 30_000,
  });
}
