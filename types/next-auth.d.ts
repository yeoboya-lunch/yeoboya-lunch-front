import NextAuth, {DefaultSession} from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
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
      address: string;
    } & DefaultSession['user'];
  }
}
