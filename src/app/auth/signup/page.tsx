'use client';

import { Session } from 'domain/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/app/_components/ui/input/Input';
import { Label } from '@/app/_components/ui/input/Label';
import { useSignUp } from '@/app/_queries/auth/authMutations';
import Button from '@/components/button';
import Layout from '@/components/layout';

type FormProps = Required<Required<Session>['user']>;

const SignupPage: NextPage = () => {
  const { mutate, isSuccess, isError, isPending, error } = useSignUp();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
  });

  const onValid: SubmitHandler<FormProps> = (sinUpForm) => {
    console.log(sinUpForm);
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
  }, [isError, isSuccess, isPending, error?.message, setError, router]);

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout title="회원가입" canGoBack>
      <div className="px-4">
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 flex flex-col gap-4">
          <Label className="flex flex-col gap-2">
            아이디
            <Input
              {...register('loginId', {
                required: '아이디는 필수 입력입니다.',
                minLength: {
                  value: 4,
                  message: '아이디는 4자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 16,
                  message: '아이디는 16자 이하이어야 합니다.',
                },
              })}
              placeholder="아이디를 입력해주세요"
              name="loginId"
              type="text"
              required
            />
          </Label>
          <p role="alert" className="text-sm text-red-500">
            {errors.loginId?.message}
          </p>
          <Label className="flex flex-col gap-2">
            비밀번호
            <Input
              {...register('password', {
                required: true,
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                  message: '비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
                },
              })}
              placeholder="비밀번호를 입력해주세요"
              name="password"
              type="password"
              required
            />
          </Label>
          {
            <p role="alert" className="text-sm text-red-500">
              {errors.password?.message}
            </p>
          }
          <Label className="flex flex-col gap-2">
            이메일
            <Input
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
              placeholder="이메일을 입력해주세요"
              id="email"
              name="email"
              type="email"
              required
            />
          </Label>
          {
            <p role="alert" className="text-sm text-red-500">
              {errors.email?.message}
            </p>
          }

          <Label className="flex flex-col gap-2">
            이름
            <Input
              {...register('name', {
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
              placeholder="이름을 입력해주세요"
              name="name"
              type="text"
              required
            />
          </Label>
          {
            <p role="alert" className="text-sm text-red-500">
              {errors.name?.message}
            </p>
          }
          <Button text={isPending ? 'Loading' : 'sign-up'} />
        </form>
      </div>
    </Layout>
  );
};

export default SignupPage;
