import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
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
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    id: string;
    issueDAt: string;
    issuer: string;
    refreshToken: string;
    refreshTokenExpirationTime: number;
    refreshTokenExpirationTimeStr: string;
    subject: string;
    tokenExpirationTime: string;
  }
}
