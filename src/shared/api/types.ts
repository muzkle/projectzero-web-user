export type UserRole = 'user' | 'partner' | 'admin';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export type MissionType = 'spotify_track_plays' | 'steam_achievement' | 'manual_code';

export type PurchaseStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type AcquiredVia = 'grant' | 'mission' | 'purchase';

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  code?: string;
  message?: string;
  statusCode?: number;
}

export interface UserDto {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  isMinor?: boolean;
  createdAt?: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDto;
}

export interface RegisterDto {
  email: string;
  password: string;
  displayName: string;
  isMinor?: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AlbumDto {
  id: string;
  partnerId: string;
  title: string;
  slug: string;
  coverUrl?: string;
  status: string;
  startsAt?: string;
  endsAt?: string;
  stickerCount?: number;
}

export interface MissionConfig {
  trackId?: string;
  minPlays?: number;
  windowDays?: number;
  appId?: number;
  achievementApiName?: string;
  codeHash?: string;
  maxRedemptions?: number;
}

export interface MissionDto {
  id: string;
  stickerId: string;
  type: MissionType;
  config: MissionConfig;
  windowStart?: string;
  windowEnd?: string;
  requiresMission: boolean;
}

export interface StickerDto {
  id: string;
  albumId: string;
  partnerId: string;
  name: string;
  description?: string;
  imageUrl: string;
  rarity: Rarity;
  supplyTotal?: number;
  supplyMinted: number;
  priceCents: number;
  currency: string;
  status: string;
  mission?: MissionDto;
  owned?: boolean;
  eligible?: boolean;
}

export interface StickerRefDto {
  id: string;
  albumId: string;
  partnerId: string;
  name: string;
  imageUrl: string;
  rarity: Rarity;
  priceCents: number;
}

export interface UserStickerDto {
  id: string;
  userId: string;
  stickerId: string;
  serialNumber: number;
  acquiredVia: AcquiredVia;
  acquiredAt: string;
  sticker?: StickerRefDto;
}

export interface WishlistItemDto {
  userId: string;
  stickerId: string;
  sticker?: StickerRefDto;
  addedAt: string;
}

export interface AlbumProgressDto {
  albumId: string;
  albumTitle: string;
  owned: number;
  total: number;
  percentage: number;
}

export interface ProfileDto {
  user: {
    id: string;
    displayName: string;
    avatarUrl?: string;
  };
  recentStickers: UserStickerDto[];
  albumProgress: AlbumProgressDto[];
  stats: {
    totalStickers: number;
    legendaryCount: number;
  };
}

export interface EligibilityDto {
  eligible: boolean;
  reason?: string;
  owned: boolean;
  missionCompleted: boolean;
}

export interface ConnectionDto {
  id: string;
  userId: string;
  provider: 'spotify' | 'steam';
  scopes: string[];
  expiresAt?: string;
  connectedAt: string;
}

export interface AuthorizeResponse {
  authUrl: string;
}

export interface ValidateMissionResponse {
  completed: boolean;
  progress: Record<string, unknown>;
  missionId: string;
  stickerId: string;
  eventId?: string;
  jobId?: string;
  status?: string;
}

export interface CreatePurchaseResponse {
  id: string;
  clientSecret?: string;
  amountCents: number;
  currency: string;
  status: PurchaseStatus;
}

export interface PurchaseDto {
  id: string;
  userId: string;
  stickerId: string;
  amountCents: number;
  platformFeeCents?: number;
  partnerAmountCents?: number;
  status: PurchaseStatus;
  clientSecret?: string;
  createdAt: string;
}

export interface RankingEntryDto {
  userId: string;
  displayName: string;
  score: number;
  rank: number;
}
