import {post} from '@libs/client/api';
import {useMutation} from '@tanstack/react-query';
import {authToken} from '@libs/client/AuthToken';

interface SinUpForm {
  email: string;
  password: string;
  name: string;
}

interface LoginForm {
  email?: string;
  phone?: string;
  password: string;
}

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

function useSignUp(): any {
  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: SinUpForm) => post({url: `/user/sign-up`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

function useLogin(): any {
  return useMutation({
    mutationFn: (value: LoginForm) => post({url: '/user/sign-in', data: value}),
    onMutate: (variables) => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        authToken.setToken({
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
      }
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export {useSignUp, useLogin};
