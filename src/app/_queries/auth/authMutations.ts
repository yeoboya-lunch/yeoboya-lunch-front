import { useMutation } from '@tanstack/react-query';
import { Login, Token } from 'domain/auth';
import { useRouter } from 'next/navigation';

import { setToken, signOut } from '@/auth';
import apiClient from '@/libs/client/apiClient';

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
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
      apiClient.post({ url: '/user/sign-up', data: { ...data, provider: 'yeoboya' } }),
  });
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: Login) => {
      return apiClient.post<Token>({ url: '/user/sign-in', data });
    },
    onSuccess: (data) => {
      setToken(data.data);
    },
  });
};

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: () =>
      apiClient.post({
        url: '/user/sign-out',
      }),
    onSuccess: async () => {
      await signOut();
      router.replace('/');
    },
  });
}
