import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useAlbum, useAlbumStickers } from '@/features/albums/useAlbums';
import { useCollection, useAlbumRanking } from '@/features/collection/useCollection';
import { useWishlist } from '@/features/wishlist/useWishlist';
import { StickerCard } from '@/shared/ui/StickerCard';
import { Spinner } from '@/shared/ui/Spinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Card } from '@/shared/ui/Card';

export function AlbumDetailPage() {
  const { idOrSlug = '' } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: album, isLoading } = useAlbum(idOrSlug);
  const { data: albumStickers, isLoading: stickersLoading } = useAlbumStickers(idOrSlug);
  const { data: collection } = useCollection(isAuthenticated);
  const { data: wishlist } = useWishlist(isAuthenticated);
  const { data: ranking } = useAlbumRanking(album?.id ?? '', isAuthenticated);

  const ownedIds = useMemo(
    () => new Set(collection?.filter((c) => c.sticker?.albumId === album?.id).map((c) => c.stickerId) ?? []),
    [collection, album?.id],
  );

  const wishlistIds = useMemo(
    () => new Set(wishlist?.filter((w) => w.sticker?.albumId === album?.id).map((w) => w.stickerId) ?? []),
    [wishlist, album?.id],
  );

  const knownStickers = albumStickers ?? [];

  if (isLoading || stickersLoading) return <Spinner className="py-16" />;
  if (!album) return <EmptyState title="Álbum não encontrado" icon="🔍" />;

  const progress = album.stickerCount ? Math.round((ownedIds.size / album.stickerCount) * 100) : 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:gap-8">
      <div className="relative overflow-hidden rounded-3xl">
        {album.coverUrl ? (
          <img src={album.coverUrl} alt={album.title} className="h-48 w-full object-cover sm:h-56 lg:h-64" />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-accent/40 to-accent-dark/40 text-6xl sm:h-56 lg:h-64">
            🎴
          </div>
        )}
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-center sm:text-left">
          <span className="font-display text-2xl font-bold sm:text-3xl">{album.title}</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="flex flex-col gap-6">
          {isAuthenticated && (
            <Card>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Progresso</span>
                <span className="font-semibold text-accent-light">
                  {ownedIds.size}/{album.stickerCount ?? '?'} ({progress}%)
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </Card>
          )}

          <section>
            <h3 className="section-title mb-4 text-center sm:text-left">Figurinhas</h3>
            {!isAuthenticated && (
              <p className="mb-4 text-center text-sm text-white/60 sm:text-left">
                <Link to="/login" className="text-accent-light underline">
                  Entre
                </Link>{' '}
                para ver seu progresso e desbloquear figurinhas.
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
              {knownStickers.map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  id={sticker.id}
                  name={sticker.name}
                  imageUrl={sticker.imageUrl}
                  rarity={sticker.rarity}
                  owned={ownedIds.has(sticker.id)}
                  wishlisted={wishlistIds.has(sticker.id)}
                />
              ))}
            </div>
            {knownStickers.length === 0 && (
              <EmptyState title="Nenhuma figurinha publicada" description="Este álbum ainda não tem figurinhas visíveis." />
            )}
          </section>
        </div>

        {ranking && ranking.length > 0 && (
          <section className="lg:sticky lg:top-24">
            <h3 className="section-title mb-4 text-center lg:text-left">Ranking</h3>
            <div className="space-y-2">
              {ranking.slice(0, 5).map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center justify-between rounded-xl glass px-4 py-3 text-sm"
                >
                  <span>
                    #{entry.rank} {entry.displayName}
                  </span>
                  <span className="text-accent-light">{entry.score} pts</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
