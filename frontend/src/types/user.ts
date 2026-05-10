export type UserProfile = {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  instagramId?: string;
  facebookId?: string;
}

export type UpdateProfileInput = {
  name: string;
  bio: string;
  instagramId?: string;
  facebookId?: string;
}
