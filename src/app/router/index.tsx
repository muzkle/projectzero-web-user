import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/shared/ui/AppLayout';
import { ProtectedRoute, GuestRoute } from './ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { AlbumDetailPage } from '@/pages/AlbumDetailPage';
import { StickerDetailPage } from '@/pages/StickerDetailPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { WishlistPage } from '@/pages/WishlistPage';
import { ConnectionsPage } from '@/pages/ConnectionsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'albums/:idOrSlug', element: <AlbumDetailPage /> },
      { path: 'stickers/:id', element: <StickerDetailPage /> },
      { path: 'connections', element: <ConnectionsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'collection', element: <CollectionPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'wishlist', element: <WishlistPage /> },
        ],
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
