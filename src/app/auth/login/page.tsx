'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import googleLoginImg from 'public/img_google_login_w.png';
import naverLoginImg from 'public/img_naver_login_w.png';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { signIn } from '@/auth';
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
          <div className="mt-2 flex flex-col items-center justify-center gap-4">
            <button className="w-1/2">
              <img src={naverLoginImg.src} alt="naver login" />
            </button>
            <button className="w-1/2">
              <img src={googleLoginImg.src} alt="google login" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
