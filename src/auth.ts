import axios from 'axios';
import dayjs from 'dayjs';
import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'email-password-credential',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '이메일을 입력해주세요.' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = { email: credentials?.email, password: credentials?.password };

        const res = await axios
          .post('/user/sign-in', payload, {
            baseURL: process.env.NEXT_PUBLIC_API_SERVER,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            responseType: 'json',
          })
          .catch((r) => {
            throw new Error('계정확인');
          });

        if (res.data.code === 200) {
          return res.data.data;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/user/sign-up', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return user;
      }

      const nowTime = dayjs();
      const tokenExpirationTime = dayjs(token.tokenExpirationTime);
      if (tokenExpirationTime.diff(nowTime, 'hour') < 1) {
        return refreshAccessToken(token);
      }
      return token;
    },

    async session({ session, token }) {
      // console.log('1', session);
      // console.log('2', user);
      // console.log('3', token);
      session.token = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: JWT) {
  const payload = { refreshToken: token.refreshToken };
  const res = await axios
    .post('/user/reissue', payload, {
      baseURL: process.env.NEXT_PUBLIC_API_SERVER,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      responseType: 'json',
    })
    .catch((r) => {
      throw new Error(r);
    });
  if (res.data.code === 200) {
    return res.data.data;
  }
  return token;
}

export default NextAuth(authOptions);
