# projectzero-web-user

React + Vite + TypeScript web app for the ProjectZero collectible stickers platform (teen audience).

## Stack

- React 18, TypeScript, Vite
- Tailwind CSS (dark theme, purple accents)
- React Router v6
- TanStack Query
- Axios (gateway API client with JWT refresh)

## Getting started

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173). API gateway default: `http://localhost:3000/v1`.

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Gateway base URL (default `http://localhost:3000/v1`) |

## Auth

- **Access token** stored in memory
- **Refresh token** in `localStorage` (`pz_refresh_token`)
- Axios interceptor attaches Bearer token and refreshes on 401

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — album list |
| `/albums/:idOrSlug` | Album detail with progress grid |
| `/stickers/:id` | Sticker detail — claim, purchase, missions |
| `/collection` | User collection (auth) |
| `/profile` | Profile & stats (auth) |
| `/wishlist` | Wishlist (auth) |
| `/connections` | Spotify / Steam OAuth |
| `/login`, `/register` | Auth |

## API integration

Proxied via gateway:

- `POST /auth/register`, `/auth/login`, `/auth/refresh`, `GET /auth/me`
- `GET /albums`, `/albums/:id`
- `GET /bff/stickers/:id` (catalog + ownership overlay)
- `POST /stickers/:id/claim`, `GET /stickers/:id/eligibility`
- `GET/POST/DELETE /me/wishlist`, `GET /me/collection`, `GET /me/profile`
- `GET /connections`, Spotify/Steam authorize
- `POST /missions/:id/validate`
- `POST /purchases`, `GET /purchases/:id`

## Build & deploy

```bash
npm run build
npm run preview
```

Docker (nginx static):

```bash
docker build -t projectzero-web-user .
```

Railway: uses `Dockerfile` + `railway.toml`.

## Project structure

```
src/
  app/          # providers, router
  pages/        # route pages
  features/     # domain hooks
  shared/
    api/        # axios client & API modules
    ui/         # reusable components
public/
  manifest.json # PWA manifest
```
