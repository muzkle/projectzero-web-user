import { useWishlist, useRemoveFromWishlist } from '@/features/wishlist/useWishlist';
import { StickerCard } from '@/shared/ui/StickerCard';
import { Button } from '@/shared/ui/Button';
import { Spinner } from '@/shared/ui/Spinner';
import { EmptyState } from '@/shared/ui/EmptyState';

export function WishlistPage() {
  const { data: wishlist, isLoading } = useWishlist();
  const remove = useRemoveFromWishlist();

  if (isLoading) return <Spinner className="py-16" />;

  if (!wishlist?.length) {
    return (
      <EmptyState
        icon="💜"
        title="Wishlist vazia"
        description="Salve figurinhas que você quer conquistar!"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold">Wishlist</h2>
      <div className="grid grid-cols-2 gap-3">
        {wishlist.map((item) => (
          <div key={item.stickerId} className="space-y-2">
            <StickerCard
              id={item.stickerId}
              name={item.sticker?.name}
              imageUrl={item.sticker?.imageUrl}
              rarity={item.sticker?.rarity ?? 'common'}
              wishlisted
            />
            <Button
              size="sm"
              variant="ghost"
              className="w-full"
              loading={remove.isPending}
              onClick={() => remove.mutate(item.stickerId)}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
