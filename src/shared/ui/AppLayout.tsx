import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

const navItems = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/collection', label: 'Coleção', icon: '📚', auth: true },
  { to: '/wishlist', label: 'Desejos', icon: '💜', auth: true },
  { to: '/profile', label: 'Perfil', icon: '👤', auth: true },
];

export function AppLayout() {
  const { isAuthenticated } = useAuth();

  const visibleItems = navItems.filter((item) => !item.auth || isAuthenticated);

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col pb-20">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-surface/80 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-gradient">StickerVerse</h1>
          <NavLink to="/connections" className="text-xl opacity-80 hover:opacity-100">
            🔗
          </NavLink>
        </div>
      </header>

      <main className="flex-1 px-4 py-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs transition ${
                  isActive ? 'text-accent-light' : 'text-white/50 hover:text-white/80'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
