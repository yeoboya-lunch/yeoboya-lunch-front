import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation} from '@tanstack/react-query';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {jwtToken} from '@libs/client/JwtToken';
import tokenAtom, {getAccessToken} from '@libs/recoil/token';
import memberAtom from '@libs/recoil/member';
import {useRouter} from 'next/router';
import {ISignUpForm, LoginForm} from '../../../../types/user';

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

function useSignUp(): any {
  const {post} = useFetchWrapper();

  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: ISignUpForm) => post({url: `/user/sign-up`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

function useLogin(): any {
  const {post} = useFetchWrapper();
  const setToken = useSetRecoilState(tokenAtom);
  const setMember = useSetRecoilState(memberAtom);

  return useMutation({
    mutationFn: (value: LoginForm) => post({url: '/user/sign-in', data: value}),
    onMutate: (variables) => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        jwtToken.setToken({
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
        setToken({
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
        setMember({
          email: data.data.data.subject,
        });
      }
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

function useLogout(): any {
  const {post} = useFetchWrapper();
  let token = useRecoilValue(getAccessToken);
  const router = useRouter();
  const resetMember = useResetRecoilState(memberAtom);
  const resetToken = useResetRecoilState(tokenAtom);
  return useMutation({
    mutationFn: () =>
      post({
        url: '/user/sign-out',
        data: {
          accessToken: token,
          refreshToken: jwtToken.refreshToken,
        },
      }),
    onMutate: (variables) => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        jwtToken.deleteToken();
        resetToken();
        resetMember();
        router.push('/');
      }
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export {useSignUp, useLogin, useLogout};