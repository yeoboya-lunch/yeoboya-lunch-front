import type {NextPage} from 'next';
import Link from 'next/link';
import Layout from '@components/layout';
import {Suspense, useEffect, useState} from 'react';
import Button from '@components/button';
import {useLogout} from '@libs/hooks/services/mutations/user';
import {useSettingMember} from '@libs/hooks/services/queries/member';
import {signOut} from 'next-auth/react';

const Profile: NextPage = () => {
  const {data: member, isLoading} = useSettingMember({suspense: false});
  const {mutate: logout} = useLogout();

  const Loading = () => {
    return (
      <h1 className="text-9xl">
        loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...loading...
      </h1>
    );
  };

  return (
    <Layout hasTabBar title="프로필">
      <div className="px-4">
        <div className="flex items-center mt-4 space-x-3">
          <div className="w-16 h-16 bg-slate-500 rounded-full" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">{member?.email}</span>
            <span className="text-sm text-gray-500">{member?.nickName}</span>
            <span>{member?.bio}</span>
          </div>
        </div>
        <div className="mt-10 flex justify-around pb-5 border-b">
          <Link href="/profile/sold" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
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
            <span className="text-sm mt-2 font-medium text-gray-700">주문내역</span>
          </Link>
          <Link href="/profile/bought" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
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
            <span className="text-sm mt-2 font-medium text-gray-700">구매내역</span>
          </Link>
          <Link href="/profile/loved" className="flex flex-col items-center">
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2 font-medium text-gray-700">관심목록</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 grid-rows-3 mt-5 gap-x-5 gap-y-10 p-4">
          <Link href="/profile/edit" className="text-sm text-gray-700">
            <div className="text-sm font-medium text-gray-700 flex flex-col justify-center justify-around items-center">
              <div className="">사진</div>
              <span>프로필 수정</span>
            </div>
          </Link>

          <Link href="/shop/register" className="text-sm text-gray-700">
            <div className="text-sm font-medium text-gray-700 flex flex-col justify-center justify-around items-center">
              <div className="">사진</div>
              <span>식당등록</span>
            </div>
          </Link>

          <Link href="/member" className="text-sm text-gray-700">
            <div className="text-sm font-medium text-gray-700 flex flex-col justify-center justify-around items-center">
              <div className="">사진</div>
              <span>당직자</span>
            </div>
          </Link>

          <Link href="/member" className="text-sm text-gray-700">
            <div className="text-sm font-medium text-gray-700 flex flex-col justify-center justify-around items-center">
              <div className="">사진</div>
              <span>상품등록</span>
            </div>
          </Link>
        </div>

        <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      </div>
      <div className="mx-4 mt-3.5" onClick={signOut}>
        <Button text="로그아웃" />
      </div>
    </Layout>
  );
};

export default Profile;
