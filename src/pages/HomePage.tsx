import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useAlbums } from '@/features/albums/useAlbums';
import { AlbumCard } from '@/shared/ui/AlbumCard';
import { Button } from '@/shared/ui/Button';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Spinner } from '@/shared/ui/Spinner';

export function HomePage() {
  const { data: albums, isLoading, error } = useAlbums();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-accent/20 via-surface-elevated to-surface-card p-5">
        <p className="text-sm text-accent-light">Coleção digital</p>
        <h2 className="font-display mt-1 text-2xl font-bold">
          {isAuthenticated ? `E aí, ${user?.displayName?.split(' ')[0]}! 👋` : 'Desbloqueie figurinhas épicas'}
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Complete missões, conecte Spotify e Steam, e monte seu álbum dos sonhos.
        </p>
        {!isAuthenticated && (
          <div className="mt-4 flex gap-2">
            <Link to="/register">
              <Button size="sm">Criar conta</Button>
            </Link>
            <Link to="/login">
              <Button size="sm" variant="secondary">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </section>

      <section>
        <h3 className="font-display mb-3 text-lg font-semibold">Álbuns disponíveis</h3>
        {isLoading && <Spinner className="py-12" />}
        {error && (
          <EmptyState
            icon="😵"
            title="Não foi possível carregar"
            description="Verifique se o gateway está rodando em localhost:3000"
          />
        )}
        {albums && albums.length === 0 && (
          <EmptyState title="Nenhum álbum ainda" description="Volte em breve — novos drops chegando!" />
        )}
        {albums && albums.length > 0 && (
          <div className="grid gap-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
