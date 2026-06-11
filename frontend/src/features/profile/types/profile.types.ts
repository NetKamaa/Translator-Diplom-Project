export type TUserProfile = {
  id: string;
  email: string;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TUpdateUserProfileRequest = {
  nickname?: string;
  avatarUrl?: string | null;
};
