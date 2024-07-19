import { useMutation } from '@tanstack/react-query';
import { useAuthActions } from 'app/auth/useAuthStore';
import { useMemberActions } from 'app/member/useMemberStore';
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
  const { setMaxAge } = useAuthActions();
  const { setMember } = useMemberActions();
  return useMutation({
    mutationFn: (data: Login) => {
      return apiClient.post<Token>('/user/sign-in', { data });
    },
    onSuccess: async (data) => {
      await setToken(data.data);
      baseHeader['Authorization'] = `Bearer ${data.data.accessToken}`;
      setMaxAge(data.data.tokenExpirationTime);
      setMember({ loginId: data.data.subject });
      router.push('/', { scroll: false });
    },
  });
};

export function useSignOut() {
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
