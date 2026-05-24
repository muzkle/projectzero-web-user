import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/app/providers/AuthProvider';
import { useClaimSticker, useSticker } from '@/features/stickers/useStickers';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/features/wishlist/useWishlist';
import { useValidateMission } from '@/features/missions/useMissions';
import { useCreatePurchase } from '@/features/purchases/usePurchases';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { RarityBadge } from '@/shared/ui/RarityBadge';
import { Spinner } from '@/shared/ui/Spinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { Badge } from '@/shared/ui/Badge';

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(cents / 100);
}

export function StickerDetailPage() {
  const { id = '' } = useParams();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { data: sticker, isLoading, error } = useSticker(id);
  const { data: wishlist } = useWishlist(isAuthenticated);
  const claimMutation = useClaimSticker();
  const addWishlist = useAddToWishlist();
  const removeWishlist = useRemoveFromWishlist();
  const validateMission = useValidateMission();
  const createPurchase = useCreatePurchase();

  const [missionCode, setMissionCode] = useState('');
  const [unlockAnim, setUnlockAnim] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const isWishlisted = wishlist?.some((w) => w.stickerId === id) ?? false;
  const isFree = sticker?.priceCents === 0;
  const isPaid = sticker && sticker.priceCents > 0;

  if (isLoading) return <Spinner className="py-16" />;
  if (error || !sticker) return <EmptyState title="Figurinha não encontrada" icon="🔍" />;

  const handleClaim = async () => {
    await claimMutation.mutateAsync(id);
    setUnlockAnim(true);
    queryClient.invalidateQueries({ queryKey: ['stickers', id] });
  };

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await removeWishlist.mutateAsync(id);
    } else {
      await addWishlist.mutateAsync(id);
    }
  };

  const handleValidateMission = async () => {
    if (!sticker.mission) return;
    const result = await validateMission.mutateAsync({
      missionId: sticker.mission.id,
      code: missionCode || undefined,
    });
    if (result.completed) {
      queryClient.invalidateQueries({ queryKey: ['stickers', id] });
    }
  };

  const handlePurchase = async () => {
    const result = await createPurchase.mutateAsync(id);
    if (result.clientSecret) {
      setPurchaseMessage(
        `Pagamento iniciado (${formatPrice(result.amountCents, result.currency)}). Integre Stripe Elements com o clientSecret para concluir.`,
      );
    } else {
      setPurchaseMessage('Compra registrada. Aguardando confirmação...');
    }
  };

  return (
    <div className="space-y-5">
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 ${unlockAnim ? 'animate-unlock' : ''}`}
      >
        <img src={sticker.imageUrl} alt={sticker.name} className="aspect-square w-full object-cover" />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-bold">{sticker.name}</h2>
          <RarityBadge rarity={sticker.rarity} />
          {sticker.owned && <Badge variant="success">Na coleção</Badge>}
        </div>
        {sticker.description && <p className="mt-2 text-sm text-white/70">{sticker.description}</p>}
        <p className="mt-2 text-sm text-white/50">
          {sticker.supplyMinted}
          {sticker.supplyTotal != null ? ` / ${sticker.supplyTotal}` : ''} minted
        </p>
      </div>

      {!isAuthenticated && (
        <Card>
          <p className="text-sm text-white/70">
            <Link to="/login" className="text-accent-light underline">
              Faça login
            </Link>{' '}
            para resgatar, comprar ou adicionar à wishlist.
          </p>
        </Card>
      )}

      {isAuthenticated && !sticker.owned && (
        <div className="flex flex-col gap-2">
          {isFree && sticker.eligible && (
            <Button loading={claimMutation.isPending} onClick={handleClaim}>
              Resgatar grátis ✨
            </Button>
          )}

          {isFree && !sticker.eligible && (
            <Card>
              <p className="text-sm text-white/70">
                Complete a missão ou conecte suas contas para desbloquear esta figurinha.
              </p>
            </Card>
          )}

          {isPaid && (
            <Button loading={createPurchase.isPending} onClick={handlePurchase}>
              Comprar {formatPrice(sticker.priceCents, sticker.currency)}
            </Button>
          )}

          <Button variant="secondary" loading={addWishlist.isPending || removeWishlist.isPending} onClick={handleWishlistToggle}>
            {isWishlisted ? 'Remover da wishlist' : 'Adicionar à wishlist 💜'}
          </Button>
        </div>
      )}

      {purchaseMessage && (
        <Card>
          <p className="text-sm text-white/80">{purchaseMessage}</p>
        </Card>
      )}

      {isAuthenticated && sticker.mission && !sticker.owned && (
        <Card>
          <h3 className="font-display font-semibold">Missão</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-accent-light">{sticker.mission.type.replace(/_/g, ' ')}</p>

          {sticker.mission.type === 'manual_code' && (
            <div className="mt-3 space-y-2">
              <Input
                label="Código secreto"
                value={missionCode}
                onChange={(e) => setMissionCode(e.target.value)}
                placeholder="Digite o código"
              />
            </div>
          )}

          {(sticker.mission.type === 'spotify_track_plays' || sticker.mission.type === 'steam_achievement') && (
            <p className="mt-2 text-sm text-white/60">
              Conecte sua conta em{' '}
              <Link to="/connections" className="text-accent-light underline">
                Conexões
              </Link>{' '}
              e valide o progresso.
            </p>
          )}

          <Button
            className="mt-3 w-full"
            variant="secondary"
            loading={validateMission.isPending}
            onClick={handleValidateMission}
          >
            Validar missão
          </Button>

          {validateMission.data && (
            <p className="mt-2 text-sm text-emerald-400">
              {validateMission.data.completed ? 'Missão concluída! 🎉' : 'Progresso atualizado.'}
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
