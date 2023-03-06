import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'email-password-credential',
      credentials: {
        email: {label: 'email', type: 'text', placeholder: 'z@z.z'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials, req) {
        console.log('-----------------');
        console.log(credentials);
        const res = axios.post('/user/sign-in', credentials, {
          baseURL: process.env.NEXT_PUBLIC_API_SERVER,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
          withCredentials: true,
          responseType: 'json',
        });

        if (res) {
          alert('11');
        } else {
          alert('22');
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
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
