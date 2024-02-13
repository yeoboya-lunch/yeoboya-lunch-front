'use client';

import type { NextPage } from 'next';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/button';
import Input from '@/components/input';
import { ISignUpForm } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/libs/hooks/services/mutations/user';

import { User } from '@/domain/user';

const SignupPage: NextPage = () => {
  const { mutate, isSuccess, isError, isPending, error } = useSignUp();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({
    mode: 'onSubmit',
  });

  const onValid = (sinUpForm: User) => {
    mutate(sinUpForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (isError) {
      setError('email', { type: 'focus', message: error.message }, { shouldFocus: true });
    }
    if (isSuccess) {
      router.push('/auth/login?init=true');
    }
  }, [isPending]);

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Welcome to Yeoboya Lunch</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm font-medium text-gray-500">Enter using:</h5>
        </div>
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 flex flex-col space-y-4">
          <Input
            register={register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
            name="email"
            label="Email address"
            type="email"
            required
          />
          {errors.email && (
            <p role="alert" className="text-sm text-red-500">
              {errors.email?.message}
            </p>
          )}
          <Input
            register={register('password', {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                message: '비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
              },
            })}
            name="password"
            label="password"
            type="password"
            required
          />
          {errors.password && (
            <p role="alert" className="text-sm text-red-500">
              {errors.password?.message}
            </p>
          )}
          <Input
            register={register('name', {
              required: '이름은 필수 입력입니다.',
              minLength: {
                value: 2,
                message: '길이가 2에서 6 사이여야 합니다',
              },
              maxLength: {
                value: 6,
                message: '길이가 2에서 6 사이여야 합니다',
              },
            })}
            name="name"
            label="name"
            type="text"
            required
          />
          {errors.name && (
            <p role="alert" className="text-sm text-red-500">
              {errors.name?.message}
            </p>
          )}
          <Button text={isPending ? 'Loading' : 'sign-up'} />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
