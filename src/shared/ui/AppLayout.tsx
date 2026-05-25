import { Link, useNavigate } from 'react-router-dom';
import { AppShell, UserMenu } from '@muzkle/ui';
import type { NavItemConfig } from '@muzkle/ui';
import { useAuth } from '@/app/providers/AuthProvider';
import { HeaderSearch } from '@/features/search/HeaderSearch';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems: NavItemConfig[] = [
    { to: '/', label: 'Início', icon: '🏠', end: true },
    { to: '/collection', label: 'Coleção', icon: '📚', hidden: !isAuthenticated },
    { to: '/wishlist', label: 'Desejos', icon: '💜', hidden: !isAuthenticated },
    { to: '/connections', label: 'Conexões', icon: '🔗' },
    { to: '/profile', label: 'Perfil', icon: '👤', hidden: !isAuthenticated },
  ];

  const userMenu = isAuthenticated ? (
    <UserMenu
      displayName={user?.displayName ?? 'Usuário'}
      email={user?.email}
      items={[
        { label: 'Perfil', to: '/profile', icon: <span>👤</span> },
        { label: 'Conexões', to: '/connections', icon: <span>🔗</span> },
        { label: 'Configurações', to: '/settings', icon: <span>⚙️</span> },
        {
          label: 'Sair',
          icon: <span>🚪</span>,
          danger: true,
          onClick: () => {
            logout();
            navigate('/login');
          },
        },
      ]}
    />
  ) : (
    <Link
      to="/login"
      className="rounded-xl border border-white/10 bg-surface-elevated/80 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-accent/30"
    >
      Entrar
    </Link>
  );

  return (
    <AppShell
      brandName="StickerVerse"
      brandSubtitle="Coleção digital"
      navItems={navItems}
      headerSearch={<HeaderSearch />}
      userMenu={userMenu}
      sidebarStorageKey="stickerverse-user-sidebar"
    >
      <Outlet />
    </AppShell>
  );
}
