
export type AppStep = 'landing' | 'avatar-generator' | 'studio' | 'gallery'; // Note: 'gallery' is now a tab within 'studio'

export const AVATAR_STYLES = ['Hyperrealistic', 'Anime', 'Cartoon', 'Pixel Art', 'Sci-Fi'] as const;
export type AvatarStyle = typeof AVATAR_STYLES[number];

export interface Measurements {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
}

export interface ClothingDetails {
  itemType: string;
  material: string;
  fit: string;
  description: string;
}

export interface TryOnResult {
  id: string;
  finalImage: string;
  avatarImage: string;
  clothingImages: string[];
  clothingDetails: ClothingDetails;
  measurements: Measurements;
  timestamp: string;
}