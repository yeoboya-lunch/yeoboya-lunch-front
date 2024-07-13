import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Login, Token } from 'domain/auth';
import { useResetRecoilState } from 'recoil';

import { setToken, signOut } from '@/auth';
import apiClient from '@/libs/client/fetch-wrapper';
import memberAtom from '@/libs/recoil/member';

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
  const { post } = apiClient();

  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (data: Credentials) =>
      post({ url: '/user/sign-up', data: { ...data, provider: 'yeoboya' } }),
  });
}

export const useSignIn = () => {
  const { post } = apiClient();

  return useMutation({
    mutationFn: (data: Login) => {
      return post<Token>({ url: '/user/sign-in', data });
    },
    onSuccess: async (data) => {
      await setToken(data.data.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.data.accessToken}`;
    },
  });
};

export function useLogout() {
  const { post } = apiClient();
  const resetMember = useResetRecoilState(memberAtom);
  return useMutation({
    mutationFn: () =>
      post({
        url: '/user/sign-out',
      }),
    onSuccess: (data) => {
      if (data.status === 200) {
        resetMember();
        signOut();
      }
    },
  });
}
