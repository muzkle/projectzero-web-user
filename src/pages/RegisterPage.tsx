import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ email, password: password, displayName, isMinor });
      navigate('/', { replace: true });
    } catch {
      setError('Não foi possível criar a conta. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="w-full max-w-md">
        <Card className="space-y-5">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-gradient">Criar conta</h1>
          <p className="mt-1 text-sm text-white/60">Junte-se à comunidade StickerVerse</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome de exibição"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            minLength={2}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={isMinor}
              onChange={(e) => setIsMinor(e.target.checked)}
              className="rounded border-white/20 bg-white/5 accent-accent"
            />
            Tenho menos de 18 anos
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit"
            className="w-full"
            loading={loading}
          >
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-white/60">
          Já tem conta?{' '}
          <Link to="/login" className="text-accent-light underline">
            Entrar
          </Link>
        </p>
      </Card>
      </div>
    </div>
  );
}
