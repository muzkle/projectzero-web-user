import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Configurações</h1>
        <p className="mt-1 text-sm text-white/60">Preferências da conta</p>
      </div>

      <Card>
        <h2 className="font-display font-semibold">Conta</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/50">Nome</dt>
            <dd className="font-medium">{user?.displayName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/50">E-mail</dt>
            <dd className="font-medium">{user?.email}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/profile">
            <Button variant="secondary" size="sm">
              Ver perfil
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout}>
            Sair
          </Button>
        </div>
      </Card>
    </div>
  );
}
