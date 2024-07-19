import { Member } from 'domain/member';

export type Login = {
  loginId: string;
  password: string;
};

export type Token = {
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
  user?: Partial<Member & { password: string }>;
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
