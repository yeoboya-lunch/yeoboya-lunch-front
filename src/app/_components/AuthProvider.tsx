'use client';

import { useAuthActions, useMaxAge } from 'app/auth/useAuthStore';
import { useLoginId } from 'app/member/useMemberStore';
import { refreshAccessToken } from 'auth';
import apiClient, { baseHeader } from 'client/apiClient';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const loginId = useLoginId();
  const maxAge = useMaxAge();
  const { init } = useAuthActions();

  useEffect(() => {
    const refresh = async () => {
      const result = await refreshAccessToken(loginId);
      if (result.isSuccess) {
        init({
          token: result.data.accessToken,
          maxAge: result.data.tokenExpirationTime,
        });
        baseHeader['Authorization'] = `Bearer ${result.data.accessToken}`;
        return result;
      }

      console.error(result);
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
  }, [loginId, maxAge, init]);

  useEffect(() => {
    (async () => {
      const result = await apiClient.get('/auth/api/token', {
        baseURL: process.env.NEXT_PUBLIC_FRONT_URL,
      });

      if (result.code === 401) {
        router.push('/login');
        return;
      }

      if (result.data) {
        console.log(result.data);
        baseHeader['Authorization'] = `Bearer ${result.data}`;
      }
    })();
  }, [router]);

  return <>{children}</>;
};

export default AuthProvider;
