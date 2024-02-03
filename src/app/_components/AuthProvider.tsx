'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider
    // refetchInterval={5 * 60}
    // refetchOnWindowFocus={false}
    >
      <CookiesProvider>{children}</CookiesProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
