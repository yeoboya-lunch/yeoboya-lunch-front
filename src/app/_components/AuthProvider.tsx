'use client';

import { useAuthActions, useMaxAge } from 'app/auth/useAuthStore';
import { useLoginId } from 'app/member/useMemberStore';
import { refreshAccessToken } from 'auth';
import apiClient, { baseHeader } from 'client/apiClient';
import dayjs from 'dayjs';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const loginId = useLoginId();
  const maxAge = useMaxAge();
  const { setMaxAge } = useAuthActions();

  useEffect(() => {
    const refresh = async () => {
      try {
        const token = await refreshAccessToken(loginId);
        if (token) {
          setMaxAge(token.tokenExpirationTime);
          baseHeader['Authorization'] = `Bearer ${token.accessToken}`;
          return token;
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!maxAge) {
      refresh();
      return;
    }

    const tokenMaxAge = dayjs(maxAge).diff(Date.now(), 'second');

    const timeout = setTimeout(
      async () => {
        try {
          refresh();
        } catch (e) {
          console.error(e);
        }
      },
      tokenMaxAge - 60 * 60 * 10,
    );

    return () => clearTimeout(timeout);
  }, [loginId, maxAge, setMaxAge]);

  useEffect(() => {
    (async () => {
      const result = await apiClient.get('/auth/api/token', {
        baseURL: process.env.NEXT_PUBLIC_FRONT_URL,
      });
      if (result.data) {
        console.log(result.data);
        baseHeader['Authorization'] = `Bearer ${result.data}`;
      }
    })();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
