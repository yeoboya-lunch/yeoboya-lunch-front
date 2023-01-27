import {post} from '@libs/client/api';
import {useState} from 'react';
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

export const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

export const useMember = () => {
  const [signUp, setSignUp] = useState({});

  const insertMember: any = useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: SinUpForm) => post({url: `/user/sign-up`, data: value}),
    onMutate: (value) => {
      console.log(
        'onMutate 는 mutation 함수가 실행되기 전에 실행되고 mutation 함수가 받을 동일한 변수가 전달된다.',
      );
      console.log('optimistic update 사용 시 유용한 함수이다.');
    },
    onSuccess: (data) => {
      setSignUp(data);
      console.log('onSuccess 는 mutation 이 성공하고 결과를 전달할 때 실행된다.');
    },
    onSettled: () => {
      console.log(
        'onSettled 는 mutation 이 성공해서 성공한 데이터 또는 error가 전달될 때 실행된다. (성공하든 실패하든 아무튼 결과가 전달된다)',
      );
    },
    onError: () => {
      console.log('onError 는 mutation 이 error 를 만났을 때 실행된다.');
    },
  });

  const loginMember: any = useMutation({
    mutationFn: (value: LoginForm) => post({url: '/user/sign-in', data: value}),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        authToken.setToken({
          accessToken: data.data.data.accessToken,
          refreshToken: data.data.data.refreshToken,
          refreshTokenExpirationTime: data.data.data.refreshTokenExpirationTime,
        });
      }
    },
    onError: (data) => {
      console.log('ㅜㅜ', data);
    },
  });

  return {
    signUp: signUp ? signUp : setSignUp,
    loginMember,
    insertMember,
  };
};
