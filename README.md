# projectzero-web-user

React + Vite + TypeScript web app for the ProjectZero collectible stickers platform.

**Layout:** desktop-first shell via [`@muzkle/ui`](https://github.com/muzkle/projectzero-ui) — sidebar colapsável, header com busca global, figurinhas retrato 3:4.

## Stack

- React 18, TypeScript, Vite
- `@muzkle/ui@0.1.0` (GitHub Packages)
- Tailwind CSS (tema escuro premium)
- React Router v6
- TanStack Query
- Axios (gateway API client with JWT refresh)

## Getting started

```bash
cp .npmrc.example .npmrc
# PAT com read:packages (mesmo NODE_AUTH_TOKEN do Railway)
$env:NODE_AUTH_TOKEN = "ghp_xxxx"

cp .env.example .env
npm install
npm run dev
```

**Sem PAT local:** instale o pacote a partir do tarball do monorepo:

```bash
npm install file:../projectzero-ui/muzkle-ui-0.1.0.tgz
# ou: cd ../projectzero-ui && npm pack && cd ../projectzero-web-user && npm install ../projectzero-ui/muzkle-ui-0.1.0.tgz
```

Para atualizar `package-lock.json` com URL do GitHub Packages (opcional):

```bash
NODE_AUTH_TOKEN=ghp_xxx node scripts/add-ui-lock.cjs projectzero-web-user/package-lock.json
```

App runs at [http://localhost:5173](http://localhost:5173). API gateway default: `http://localhost:3000/v1`.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Gateway base URL (default `http://localhost:3000/v1`) |
| `NODE_AUTH_TOKEN` | PAT GitHub com `read:packages` (build/install) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — album list |
| `/albums/:idOrSlug` | Album detail — grid retrato |
| `/stickers/:id` | Sticker detail — hero retrato + ações |
| `/search?q=` | Resultados de busca global |
| `/collection` | User collection (auth) |
| `/profile` | Profile & stats (auth) |
| `/settings` | Configurações da conta (auth) |
| `/wishlist` | Wishlist (auth) |
| `/connections` | Spotify / Steam OAuth |
| `/login`, `/register` | Auth |

## Build & deploy

```bash
npm run build
```

Docker:

```bash
docker build --build-arg NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN -t projectzero-web-user .
```

Railway — configure `NODE_AUTH_TOKEN` e `VITE_API_URL` no serviço:

```bash
railway up projectzero-web-user --path-as-root --service web-user
```

Ver [ADR-002](../docs/ADR/002-desktop-first-portrait-stickers.md).
