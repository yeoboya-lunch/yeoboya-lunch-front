'use client';

import { useAuthActions, useMaxAge } from 'app/auth/useAuthStore';
import { useLoginId } from 'app/member/useMemberStore';
import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';

import { refreshAccessToken } from '@/auth';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const loginId = useLoginId();
  const maxAge = useMaxAge();
  const { setMaxAge } = useAuthActions();

  useEffect(() => {
    const tokenMaxAge = dayjs(maxAge).diff(Date.now(), 'second');
    const timeout = setTimeout(
      async () => {
        const token = await refreshAccessToken(loginId);
        if (token) {
          setMaxAge(token.tokenExpirationTime);
        }
      },
      tokenMaxAge - 60 * 60 * 10,
    );

    return () => clearTimeout(timeout);
  }, [loginId, maxAge, setMaxAge]);

  return <>{children}</>;
};

export default AuthProvider;
