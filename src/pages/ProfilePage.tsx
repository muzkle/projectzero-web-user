import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { useProfile } from '@/features/collection/useCollection';
import { StickerCard } from '@/shared/ui/StickerCard';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Spinner } from '@/shared/ui/Spinner';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <Spinner className="py-16" />;

  return (
    <div className="space-y-5">
      <Card className="text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-3xl font-bold">
          {profile?.user.displayName?.[0]?.toUpperCase() ?? user?.displayName?.[0]?.toUpperCase() ?? '?'}
        </div>
        <h2 className="font-display text-xl font-bold">{profile?.user.displayName ?? user?.displayName}</h2>
        <p className="text-sm text-white/60">{user?.email}</p>
        {profile && (
          <div className="mt-4 flex justify-center gap-6 text-center">
            <div>
              <p className="font-display text-2xl font-bold text-accent-light">{profile.stats.totalStickers}</p>
              <p className="text-xs text-white/50">Total</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-amber-400">{profile.stats.legendaryCount}</p>
              <p className="text-xs text-white/50">Lendárias</p>
            </div>
          </div>
        )}
      </Card>

      {profile?.albumProgress && profile.albumProgress.length > 0 && (
        <section>
          <h3 className="font-display mb-3 font-semibold">Progresso nos álbuns</h3>
          <div className="space-y-2">
            {profile.albumProgress.map((album) => (
              <Link key={album.albumId} to={`/albums/${album.albumId}`}>
                <Card className="transition hover:border-accent/30">
                  <div className="flex items-center justify-between text-sm">
                    <span>{album.albumTitle}</span>
                    <span className="text-accent-light">{album.percentage}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${album.percentage}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    {album.owned}/{album.total} figurinhas
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {profile?.recentStickers && profile.recentStickers.length > 0 && (
        <section>
          <h3 className="font-display mb-3 font-semibold">Recentes</h3>
          <div className="grid grid-cols-3 gap-2">
            {profile.recentStickers.map((item) => (
              <StickerCard
                key={item.id}
                id={item.stickerId}
                name={item.sticker?.name}
                imageUrl={item.sticker?.imageUrl}
                rarity={item.sticker?.rarity ?? 'common'}
                owned
              />
            ))}
          </div>
        </section>
      )}

      <Button variant="ghost" className="w-full" onClick={logout}>
        Sair da conta
      </Button>
    </div>
  );
}
