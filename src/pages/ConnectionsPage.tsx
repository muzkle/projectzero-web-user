import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import {
  useConnections,
  useConnectSpotify,
  useConnectSteam,
  useConnectionCallbackEffect,
} from '@/features/connections/useConnections';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Spinner } from '@/shared/ui/Spinner';
import { Badge } from '@/shared/ui/Badge';
import { Link } from 'react-router-dom';

export function ConnectionsPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCallback = useConnectionCallbackEffect();
  const { data: connections, isLoading } = useConnections(isAuthenticated);
  const connectSpotify = useConnectSpotify();
  const connectSteam = useConnectSteam();

  useEffect(() => {
    if (searchParams.get('provider')) {
      handleCallback(window.location.search);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, handleCallback]);

  if (!isAuthenticated) {
    return (
      <Card className="text-center">
        <p className="text-sm text-white/70">
          <Link to="/login" className="text-accent-light underline">
            Faça login
          </Link>{' '}
          para conectar Spotify e Steam.
        </p>
      </Card>
    );
  }

  if (isLoading) return <Spinner className="py-16" />;

  const spotifyConnected = connections?.some((c) => c.provider === 'spotify');
  const steamConnected = connections?.some((c) => c.provider === 'steam');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-xl font-bold">Conexões</h2>
        <p className="mt-1 text-sm text-white/60">
          Conecte suas contas para completar missões de Spotify e Steam.
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎵</span>
            <div>
              <p className="font-semibold">Spotify</p>
              <p className="text-xs text-white/50">Missões de plays em faixas</p>
            </div>
          </div>
          {spotifyConnected ? (
            <Badge variant="success">Conectado</Badge>
          ) : (
            <Button size="sm" loading={connectSpotify.isPending} onClick={() => connectSpotify.mutate()}>
              Conectar
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <p className="font-semibold">Steam</p>
              <p className="text-xs text-white/50">Missões de conquistas</p>
            </div>
          </div>
          {steamConnected ? (
            <Badge variant="success">Conectado</Badge>
          ) : (
            <Button size="sm" loading={connectSteam.isPending} onClick={() => connectSteam.mutate()}>
              Conectar
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
