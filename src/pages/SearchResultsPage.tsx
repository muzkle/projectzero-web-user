import { useSearchParams } from 'react-router-dom';
import { StickerPortrait } from '@muzkle/ui';
import { useSearch } from '@/features/search/useSearch';
import { AlbumCard } from '@/shared/ui/AlbumCard';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Spinner } from '@/shared/ui/Spinner';

export function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const { data, isLoading, error } = useSearch(q, q.trim().length >= 1);

  if (!q.trim()) {
    return <EmptyState title="Digite um termo de busca" icon="🔍" />;
  }

  if (isLoading) return <Spinner className="py-16" />;
  if (error) {
    return (
      <EmptyState
        title="Erro na busca"
        description="Não foi possível carregar os resultados."
        icon="😵"
      />
    );
  }

  const albums = data?.albums ?? [];
  const stickers = data?.stickers ?? [];

  if (albums.length === 0 && stickers.length === 0) {
    return (
      <EmptyState
        title={`Nenhum resultado para "${q}"`}
        description="Tente outro termo ou explore os álbuns na home."
        icon="🔍"
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold">Resultados</h1>
        <p className="mt-1 text-sm text-white/60">
          {albums.length} álbum(ns), {stickers.length} figurinha(s) para &quot;{q}&quot;
        </p>
      </div>

      {albums.length > 0 && (
        <section>
          <h2 className="section-title mb-4">Álbuns</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      {stickers.length > 0 && (
        <section>
          <h2 className="section-title mb-4">Figurinhas</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
            {stickers.map((sticker) => (
              <StickerPortrait
                key={sticker.id}
                id={sticker.id}
                name={sticker.name}
                imageUrl={sticker.imageUrl}
                rarity={sticker.rarity}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
