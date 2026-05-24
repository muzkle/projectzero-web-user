import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { connectionsApi } from '@/shared/api/connections.api';

export function useConnections(enabled = true) {
  return useQuery({
    queryKey: ['connections'],
    queryFn: connectionsApi.list,
    enabled,
  });
}

export function useConnectSpotify() {
  return useMutation({
    mutationFn: connectionsApi.authorizeSpotify,
    onSuccess: (data) => {
      window.location.href = data.authUrl;
    },
  });
}

export function useConnectSteam() {
  return useMutation({
    mutationFn: connectionsApi.authorizeSteam,
    onSuccess: (data) => {
      window.location.href = data.authUrl;
    },
  });
}

export function useConnectionCallbackEffect() {
  const queryClient = useQueryClient();

  return (search: string) => {
    const params = new URLSearchParams(search);
    const provider = params.get('provider');
    const status = params.get('status');
    if (provider && status === 'connected') {
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    }
  };
}
