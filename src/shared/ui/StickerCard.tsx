import { Link } from 'react-router-dom';
import type { Rarity } from '@/shared/api/types';
import { RarityBadge } from './RarityBadge';

interface StickerCardProps {
  id?: string;
  name?: string;
  imageUrl?: string;
  rarity?: Rarity;
  owned?: boolean;
  locked?: boolean;
  wishlisted?: boolean;
  onClick?: () => void;
}

export function StickerCard({
  id,
  name,
  imageUrl,
  rarity = 'common',
  owned = false,
  locked = false,
  wishlisted = false,
  onClick,
}: StickerCardProps) {
  const content = (
    <div
      className={`relative overflow-hidden rounded-xl border transition ${
        owned
          ? 'border-accent/40 bg-surface-elevated'
          : locked
            ? 'border-white/5 bg-surface-card opacity-60'
            : 'border-white/10 bg-surface-elevated hover:border-accent/30'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="aspect-square overflow-hidden bg-black/20">
        {locked ? (
          <div className="flex h-full items-center justify-center text-3xl">🔒</div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={name ?? 'Figurinha'} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">⭐</div>
        )}
      </div>
      <div className="p-2">
        {name && <p className="truncate text-xs font-medium text-white">{name}</p>}
        <div className="mt-1 flex items-center gap-1">
          <RarityBadge rarity={rarity} />
          {owned && <span className="text-[10px] text-emerald-400">✓</span>}
          {wishlisted && !owned && <span className="text-[10px] text-pink-400">♥</span>}
        </div>
      </div>
    </div>
  );

  if (id && !locked && !onClick) {
    return <Link to={`/stickers/${id}`}>{content}</Link>;
  }

  return content;
}
