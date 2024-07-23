import { useMutation } from '@tanstack/react-query';
import { useAuthActions, useToken } from 'app/auth/useAuthStore';
import { useMemberActions } from 'app/member/useMemberStore';
import apiClient, { baseHeader } from 'client/apiClient';
import { Login, Token } from 'domain/auth';
import { useRouter } from 'next/navigation';

import { deleteToken, setToken } from '@/auth';

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (loginId: string) => [...userKeys.details(), loginId],
  insert: () => ['sign-up'],
};
type Credentials = {
  loginId: string;
  email: string;
  password: string;
  name: string;
};
export function useSignUp() {
  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (data: Credentials) =>
      apiClient.post('/user/sign-up', { data: { ...data, provider: 'yeoboya' } }),
  });
}

export const useSignIn = () => {
  const router = useRouter();
  const { init } = useAuthActions();
  const { setMember } = useMemberActions();
  return useMutation({
    mutationFn: (data: Login) => {
      return apiClient.post<Token>('/user/sign-in', { data });
    },
    onSuccess: async (data) => {
      await setToken(data.data);
      baseHeader['Authorization'] = `Bearer ${data.data.accessToken}`;
      init({
        token: data.data.accessToken,
        maxAge: data.data.tokenExpirationTime,
      });
      setMember({ loginId: data.data.subject });
      router.push('/', { scroll: false });
    },
  });
};

export function useSignOut() {
  const router = useRouter();
  const token = useToken();
  return useMutation({
    mutationFn: () =>
      apiClient.post('/user/sign-out', {
        data: { accessToken: token },
      }),
    onSuccess: async () => {
      await deleteToken();
      baseHeader['Authorization'] = '';
      router.replace('/');
    },
  });
}
