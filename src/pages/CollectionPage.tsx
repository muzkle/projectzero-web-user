import { useCollection } from '@/features/collection/useCollection';
import { StickerCard } from '@/shared/ui/StickerCard';
import { Spinner } from '@/shared/ui/Spinner';
import { EmptyState } from '@/shared/ui/EmptyState';

export function CollectionPage() {
  const { data: collection, isLoading } = useCollection();

  if (isLoading) return <Spinner className="py-16" />;

  if (!collection?.length) {
    return (
      <EmptyState
        icon="📭"
        title="Sua coleção está vazia"
        description="Explore álbuns e resgate figurinhas grátis ou complete missões!"
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold">Minha coleção</h2>
      <p className="text-sm text-white/60">{collection.length} figurinhas</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {collection.map((item) => (
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
    </div>
  );
}
