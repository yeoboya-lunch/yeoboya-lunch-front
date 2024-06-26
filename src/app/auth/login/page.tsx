'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import Button from '@/components/button';
import Input from '@/components/input';
import { cls } from '@/libs/client/utils';
import memberAtom from '@/libs/recoil/member';

interface LoginForm {
  email?: string;
  phone?: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();
  const setMember = useSetRecoilState(memberAtom);
  const [method, setMethod] = useState<'email' | 'phone'>('email');

  const onEmailClick = () => {
    reset();
    setMethod('email');
  };

  const onPhoneClick = () => {
    reset();
    setMethod('phone');
  };

  const router = useRouter();
  const onValid = async (validForm: LoginForm) => {
    const response = await signIn('email-password-credential', {
      email: validForm.email,
      password: validForm.password,
      callbackUrl: '/',
    });

    if (!response || response.error) {
      console.error('로그인 실패', response?.error);
      return;
    }

    setMember({
      email: validForm.email,
    });
    router.push('/');
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Enter to Yeoboya Lunch</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm font-medium text-gray-500">Enter using:</h5>
          <div className="mt-8 grid  w-full grid-cols-2 border-b ">
            <button
              className={cls(
                'border-b-2 pb-4 text-sm font-medium',
                method === 'email'
                  ? ' border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400',
              )}
              onClick={onEmailClick}
            >
              Email
            </button>
            <button
              className={cls(
                'border-b-2 pb-4 text-sm font-medium',
                method === 'phone'
                  ? ' border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400',
              )}
              onClick={onPhoneClick}
            >
              Phone
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 flex flex-col space-y-4">
          {method === 'email' && (
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
          )}
          {method === 'phone' && (
            <Input
              register={register('phone')}
              name="phone"
              label="Phone number"
              type="number"
              kind="phone"
              required
            />
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={'password'}>
              Password
            </label>
            <input
              {...register('password', { required: 'This is required' })}
              name="password"
              type="password"
              required
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm read-only:cursor-not-allowed read-only:text-gray-500 focus:border-orange-500
            focus:outline-none focus:ring-orange-500"
            />
          </div>
          {errors.password && (
            <p role="alert" className="text-sm text-red-500">
              {errors.password?.message}
            </p>
          )}
          {method === 'email' && <Button text={'login'} />}
          {method === 'phone' && <Button text={'Get one-time password'} />}
        </form>

        <p className="mt-5 rounded-md border p-3 text-center text-gray-700">
          여보야 점심 처음이신가요?&nbsp;
          <Link href="/auth/signup" className="text-blue-600">
            아이디 만들기
          </Link>
        </p>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">Or enter with</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
