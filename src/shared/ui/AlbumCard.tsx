import { Link } from 'react-router-dom';
import type { AlbumDto } from '@/shared/api/types';

interface AlbumCardProps {
  album: AlbumDto;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link
      to={`/albums/${album.slug || album.id}`}
      className="group block overflow-hidden rounded-2xl glass transition hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
        {album.coverUrl ? (
          <img
            src={album.coverUrl}
            alt={album.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/30 to-accent-dark/30 text-4xl">
            🎴
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-lg font-bold text-white">{album.title}</h3>
          {album.stickerCount != null && (
            <p className="text-xs text-white/70">{album.stickerCount} figurinhas</p>
          )}
        </div>
      </div>
    </Link>
  );
}
