import { StickerPortrait } from '@muzkle/ui';
import type { Rarity } from '@/shared/api/types';

interface StickerCardProps {
  id?: string;
  name?: string;
  imageUrl?: string;
  rarity?: Rarity;
  owned?: boolean;
  locked?: boolean;
  wishlisted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function StickerCard(props: StickerCardProps) {
  return <StickerPortrait {...props} />;
}
