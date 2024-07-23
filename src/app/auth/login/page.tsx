'use client';

import { Input } from 'app/_components/ui/input/Input';
import { Label } from 'app/_components/ui/input/Label';
import { useSignIn } from 'app/_queries/auth/authMutations';
import Layout from 'components/layout';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import googleLoginImg from 'public/img_google_login_w.png';
import naverLoginImg from 'public/img_naver_login_w.png';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/button';

interface LoginForm {
  loginId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const { mutate } = useSignIn();

  const onValid = async (value: LoginForm) => {
    mutate(value);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const handleGoogleLogin = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_SERVER}/oauth2/authorization/google`);
  };

  const handleNaverLogin = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_SERVER}/oauth2/authorization/naver`);
  };

  return (
    <Layout title="로그인" className="px-4" canGoBack>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="mt-8 flex flex-col space-y-4">
        <Label className="flex flex-col gap-2">
          아이디
          <Input
            {...register('loginId', {
              required: '아이디를 입력해주세요.',
            })}
            placeholder="아이디를 입력해주세요."
            name="loginId"
            type="text"
            required
          />
        </Label>
        <div>
          <Label className="flex flex-col gap-2">
            비밀번호
            <Input
              {...register('password', { required: '비밀번호를 입력해주세요.' })}
              placeholder="비밀번호를 입력해주세요."
              name="password"
              type="password"
              required
            />
          </Label>
        </div>
        {errors.password && (
          <p role="alert" className="text-sm text-red-500">
            {errors.password?.message}
          </p>
        )}
        <Button text={'login'} />
      </form>

      <p className="mt-5 rounded-md border p-3 text-center text-gray-700">
        여보야 점심 처음이신가요?&nbsp;
        <Link href="/auth/signup" className="text-blue-600" scroll={false}>
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
        <div className="mt-2 flex items-center justify-center gap-4">
          <Image
            src={naverLoginImg.src}
            alt="naver login"
            className="w-1/12 cursor-pointer"
            onClick={handleNaverLogin}
          />
          <Image
            src={googleLoginImg.src}
            alt="google login"
            className="w-1/12 cursor-pointer"
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
