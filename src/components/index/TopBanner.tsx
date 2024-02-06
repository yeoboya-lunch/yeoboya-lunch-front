import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function TopBanner() {
  const { data: session, status: statue } = useSession();

  return (
    <div className="container mx-auto mt-1 flex w-full flex-col items-center justify-center">
      <div className="mb-2 w-full rounded-md border bg-white px-4 py-5 shadow sm:px-6 dark:bg-gray-800">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          여보야 점심메뉴 시스템
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">점심 같이 먹어요~</p>

        {/*{!session && (*/}
        {/*  <Link href="/auth/login" className="text-blue-600">*/}
        {/*    로그인*/}
        {/*  </Link>*/}
        {/*)}*/}
      </div>
    </div>
  );
}
