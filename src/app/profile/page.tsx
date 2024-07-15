'use client';

import type { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@/app/_components/ui/Button';
import { useLogout } from '@/app/_queries/auth/authMutations';
import { useSettingMember } from '@/app/_queries/user/userQueries';
import Layout from '@/components/layout';

const ProfilePage: NextPage = () => {
  const { data: member } = useSettingMember();
  const { mutate } = useLogout();

  return (
    <Layout hasTabBar title="프로필">
      <div className="px-4">
        <div className="mt-4 flex items-center space-x-3">
          <div className="h-16 w-16 rounded-full bg-slate-500" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">{member?.email}</span>
            <span className="text-sm text-gray-500">{member?.name}</span>
            <span>{member?.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-10 flex justify-around border-b pb-5">
          <Link href="/history/recruit" className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">주문 모집 내역</span>
          </Link>
          <Link href="/history/join" className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">주문 참여 내역</span>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-10 p-4">
          <Link href="/profile/edit" className="text-sm text-gray-700">
            <div className="flex flex-col items-center justify-center justify-around text-sm font-medium text-gray-700">
              <div className="">사진</div>
              <span>프로필 수정</span>
            </div>
          </Link>

          <Link href="/shop/register" className="text-sm text-gray-700">
            <div className="flex flex-col items-center justify-center justify-around text-sm font-medium text-gray-700">
              <div className="">사진</div>
              <span>식당등록</span>
            </div>
          </Link>

          <Link href="/member" className="text-sm text-gray-700">
            <div className="flex flex-col items-center justify-center justify-around text-sm font-medium text-gray-700">
              <div className="">사진</div>
              <span>당직자</span>
            </div>
          </Link>

          <Link href="/member" className="text-sm text-gray-700">
            <div className="flex flex-col items-center justify-center justify-around text-sm font-medium text-gray-700">
              <div className="">사진</div>
              <span>상품등록</span>
            </div>
          </Link>
        </div>

        <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      </div>
      <div
        className="mx-4 mt-3.5"
        onClick={() => {
          mutate();
        }}
      >
        <Button variant="secondary" className="w-full">
          로그아웃
        </Button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
