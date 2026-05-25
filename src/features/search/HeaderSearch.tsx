import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '@muzkle/ui';
import { useSearch } from './useSearch';

function useDebouncedValue(value: string, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export function HeaderSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query, 300);
  const { data, isFetching } = useSearch(debounced, query.trim().length >= 2);

  const results =
    debounced.length >= 2 && data ? (
      <div className="py-2">
        {data.albums.length === 0 && data.stickers.length === 0 ? (
          <p className="px-4 py-2 text-sm text-white/50">Nenhum resultado</p>
        ) : (
          <>
            {data.albums.length > 0 && (
              <div className="px-2 pb-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white/40">Álbuns</p>
                {data.albums.slice(0, 5).map((album) => (
                  <Link
                    key={album.id}
                    to={`/albums/${album.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/5"
                  >
                    {album.title}
                  </Link>
                ))}
              </div>
            )}
            {data.stickers.length > 0 && (
              <div className="px-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white/40">Figurinhas</p>
                {data.stickers.slice(0, 5).map((sticker) => (
                  <Link
                    key={sticker.id}
                    to={`/stickers/${sticker.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-white/80 transition hover:bg-white/5"
                  >
                    {sticker.name}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    ) : null;

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      onSubmit={(value) => {
        const term = value.trim();
        if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
      }}
      loading={isFetching}
      results={results}
    />
  );
}
