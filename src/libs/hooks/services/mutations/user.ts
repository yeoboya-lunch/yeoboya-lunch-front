'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import memberAtom from '@/libs/recoil/member';

import { ISignUpForm, LoginForm } from '../../../../types/user';

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

function useSignUp() {
  const { post } = useFetchWrapper();

  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: ISignUpForm) => post({ url: `/user/sign-up`, data: value }),
  });
}

function useLogin() {
  const { post } = useFetchWrapper();
  const setMember = useSetRecoilState(memberAtom);

  return useMutation({
    mutationFn: (value: LoginForm) => post({ url: '/user/sign-in', data: value }),
    onMutate: () => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        setMember({
          email: data.data.data.subject,
        });
      }
    },
  });
}

function useLogout(): any {
  const { post } = useFetchWrapper();
  const router = useRouter();
  const resetMember = useResetRecoilState(memberAtom);
  return useMutation({
    mutationFn: () =>
      post({
        url: '/user/sign-out',
        data: {
          // accessToken: token,
          // refreshToken: jwtToken.refreshToken,
        },
      }),
    onMutate: () => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        resetMember();
        router.push('/');
      }
    },
  });
}

export { useSignUp, useLogin, useLogout };
