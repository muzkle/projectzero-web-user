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
    <div className="flex w-full flex-col gap-8 lg:gap-10">
      <section className="rounded-3xl bg-gradient-to-br from-accent/25 via-surface-elevated to-surface-card p-6 text-center sm:p-8 lg:p-10">
        <p className="text-sm font-medium text-accent-light">Coleção digital</p>
        <h2 className="font-display mx-auto mt-2 max-w-2xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          {isAuthenticated ? `E aí, ${user?.displayName?.split(' ')[0]}! 👋` : 'Desbloqueie figurinhas épicas'}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:text-base">
          Complete missões, conecte Spotify e Steam, e monte seu álbum dos sonhos.
        </p>
        {!isAuthenticated && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button>Criar conta</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Entrar</Button>
            </Link>
          </div>
        )}
      </section>

      <section className="w-full">
        <h3 className="section-title mb-5 text-center sm:mb-6">Álbuns disponíveis</h3>
        {isLoading && <Spinner className="py-16" />}
        {error && (
          <EmptyState
            icon="😵"
            title="Não foi possível carregar"
            description="Verifique sua conexão e tente novamente."
          />
        )}
        {albums && albums.length === 0 && (
          <EmptyState title="Nenhum álbum ainda" description="Volte em breve — novos drops chegando!" />
        )}
        {albums && albums.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
