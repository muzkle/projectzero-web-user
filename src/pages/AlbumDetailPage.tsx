import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useAlbum } from '@/features/albums/useAlbums';
import { useCollection, useAlbumRanking } from '@/features/collection/useCollection';
import { useWishlist } from '@/features/wishlist/useWishlist';
import { StickerCard } from '@/shared/ui/StickerCard';
import { Spinner } from '@/shared/ui/Spinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Card } from '@/shared/ui/Card';
import type { StickerRefDto } from '@/shared/api/types';

export function AlbumDetailPage() {
  const { idOrSlug = '' } = useParams();
  const { isAuthenticated } = useAuth();
  const { data: album, isLoading } = useAlbum(idOrSlug);
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

  const knownStickers = useMemo(() => {
    const map = new Map<string, StickerRefDto>();
    collection?.forEach((item) => {
      if (item.sticker && item.sticker.albumId === album?.id) {
        map.set(item.stickerId, item.sticker);
      }
    });
    wishlist?.forEach((item) => {
      if (item.sticker && item.sticker.albumId === album?.id) {
        map.set(item.stickerId, item.sticker);
      }
    });
    return Array.from(map.values());
  }, [collection, wishlist, album?.id]);

  const lockedCount = Math.max(0, (album?.stickerCount ?? 0) - knownStickers.length);

  if (isLoading) return <Spinner className="py-16" />;
  if (!album) return <EmptyState title="Álbum não encontrado" icon="🔍" />;

  const progress = album.stickerCount ? Math.round((ownedIds.size / album.stickerCount) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl">
        {album.coverUrl ? (
          <img src={album.coverUrl} alt={album.title} className="h-48 w-full object-cover" />
        ) : (
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-accent/40 to-accent-dark/40 text-6xl">
            🎴
          </div>
        )}
        <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="font-display text-2xl font-bold">{album.title}</span>
        </p>
      </div>

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
        <h3 className="font-display mb-3 font-semibold">Figurinhas</h3>
        {!isAuthenticated && (
          <p className="mb-3 text-sm text-white/60">
            <Link to="/login" className="text-accent-light underline">
              Entre
            </Link>{' '}
            para ver seu progresso e desbloquear figurinhas.
          </p>
        )}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
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
          {Array.from({ length: lockedCount }).map((_, i) => (
            <StickerCard key={`locked-${i}`} locked name="???" rarity="common" />
          ))}
        </div>
      </section>

      {ranking && ranking.length > 0 && (
        <section>
          <h3 className="font-display mb-3 font-semibold">Ranking</h3>
          <div className="space-y-2">
            {ranking.slice(0, 5).map((entry) => (
              <div
                key={entry.userId}
                className="flex items-center justify-between rounded-xl glass px-3 py-2 text-sm"
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
  );
}
