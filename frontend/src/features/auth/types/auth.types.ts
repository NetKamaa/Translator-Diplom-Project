export type TAuthResponse = {
  accessToken: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = TAuthResponse;

export type TRegisterRequest = {
  email: string;
  password: string;
  nickname?: string;
};

export type TRegisterResponse = TAuthResponse;

export type TUser = {
  id: string;
  email: string;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
