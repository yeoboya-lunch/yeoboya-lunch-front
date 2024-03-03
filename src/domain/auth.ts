import { User } from '@/domain/user';

type Token = {
  /** The user's postal address. */
  accessToken: string;
  id: string;
  issueDAt: string;
  issuer: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  refreshTokenExpirationTimeStr: string;
  subject: string;
  tokenExpirationTime: string;
};

export type Session = {
  token: Token;
  user?: Partial<User>;
};

export type JWT = {
  accessToken: string;
  id: string;
  issueDAt: string;
  issuer: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  refreshTokenExpirationTimeStr: string;
  subject: string;
  tokenExpirationTime: string;
};
