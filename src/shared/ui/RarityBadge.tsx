import type { Rarity } from '@/shared/api/types';

const rarityStyles: Record<Rarity, string> = {
  common: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  rare: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Comum',
  rare: 'Rara',
  epic: 'Épica',
  legendary: 'Lendária',
};

interface RarityBadgeProps {
  rarity: Rarity;
  className?: string;
}

export function RarityBadge({ rarity, className = '' }: RarityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${rarityStyles[rarity]} ${className}`}
    >
      {rarityLabels[rarity]}
    </span>
  );
}
