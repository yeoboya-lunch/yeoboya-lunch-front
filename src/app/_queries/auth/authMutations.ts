import { useMutation } from '@tanstack/react-query';
import apiClient, { baseHeader } from 'client/apiClient';
import { Login, Token } from 'domain/auth';
import { useRouter } from 'next/navigation';

import { deleteToken, setToken } from '@/auth';

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
      apiClient.post('/user/sign-up', { data: { ...data, provider: 'yeoboya' } }),
  });
}

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Login) => {
      return apiClient.post<Token>('/user/sign-in', { data });
    },
    onSuccess: async (data) => {
      await setToken(data.data);
      baseHeader['Authorization'] = `Bearer ${data.data.accessToken}`;
      router.push('/');
    },
  });
};

export function useLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: () => apiClient.post('/user/sign-out'),
    onSuccess: async () => {
      await deleteToken();
      baseHeader['Authorization'] = '';
      router.replace('/');
    },
  });
}
