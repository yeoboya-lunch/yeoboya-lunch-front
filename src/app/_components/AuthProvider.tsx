'use client';

import { useAuthActions, useMaxAge } from 'app/auth/useAuthStore';
import { useLoginId } from 'app/member/useMemberStore';
import { baseHeader } from 'client/apiClient';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const token = baseHeader['Authorization'];
  const loginId = useLoginId();
  const maxAge = useMaxAge();
  const { reset } = useAuthActions();

  useEffect(() => {
    const refresh = async () => {
      // if () {
      //   const data = await refreshAccessToken(loginId);
      // }
      console.log(document.cookie);
    };

    refresh();
  }, [maxAge, token, reset, loginId]);
  return <>{children}</>;
};

export default AuthProvider;
