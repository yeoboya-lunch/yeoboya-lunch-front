import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'email-password-credential',
      name: 'Credentials',
      credentials: {
        email: {label: 'email', type: 'text', placeholder: 'z@z.z'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials, req) {
        const payload = {email: credentials?.email, password: credentials?.password};

        const res = await axios
          .post('/user/sign-in', payload, {
            baseURL: process.env.NEXT_PUBLIC_API_SERVER,
            headers: {'Content-Type': 'application/json'},
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
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/user/sign-up', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      return true;
    },
    async redirect({url, baseUrl}) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    async jwt({token, user, account, profile, isNewUser}) {
      user && (token.user = user);
      return token;
    },
    async session({session, user, token}) {
      session.user = token.user;
      if (session.user != null && token.hasAcceptedTerms != null) {
        session.user.hasAcceptedTerms = token?.hasAcceptedTerms;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
