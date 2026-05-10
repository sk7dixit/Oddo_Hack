import type { UserProfile, UpdateProfileInput } from '../types/user';

const _mockProfile: UserProfile = {
  id: 'u1',
  name: 'Explorer Pro',
  email: 'explorer.pro@traveloop.com',
  bio: 'Passionate traveler, mountain hiker, and sushi lover. Always looking for the next adventure.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  instagramId: '@explorer_pro',
  facebookId: 'explorer.pro.official'
};

let currentProfile = { ..._mockProfile };

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...currentProfile };
  },

  updateProfile: async (data: UpdateProfileInput): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    currentProfile = { ...currentProfile, ...data };
    return { ...currentProfile };
  },

  updateAvatar: async (url: string): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    currentProfile = { ...currentProfile, avatar: url };
    return { ...currentProfile };
  }
};
