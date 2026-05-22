import type { Request } from 'express';

export type TAuthenticatedUser = {
  id: string;
  email: string;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TRequestWithUser = Request & {
  user: TAuthenticatedUser;
};
