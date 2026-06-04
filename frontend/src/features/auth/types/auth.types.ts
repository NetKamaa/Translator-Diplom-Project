export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  nickname?: string;
};

export type TUser = {
  id: string;
  email: string;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
