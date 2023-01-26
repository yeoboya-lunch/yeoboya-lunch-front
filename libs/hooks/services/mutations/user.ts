import {post} from '@libs/client/api';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';

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

type re = {
  code: number;
  message: string;
};

export const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

export const useMember = () => {
  const [signUp, setSignUp] = useState({});

  const insertMember = useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: SinUpForm) => post({url: `/user/sign-up`, data: value}),
    onMutate: () => {
      console.log('what timing?');
    },
    onSuccess: (data) => {
      setSignUp(data);
      console.log('success', data);
    },
    onSettled: () => {},
    onError: () => {},
  });

  const loginMember = useMutation({
    mutationFn: (value: LoginForm) => post({url: '/user/sign-in', data: value}),
  });

  return {
    signUp: signUp ?? '',
    loginMember,
    insertMember,
  };
};
