'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import useLocalStorage from 'use-local-storage';
import { useObserver } from '@libs/client/useObserver';

type TMember = {
  email: string;
  name: string;
  nickName: string;
  phoneNumber: string;
  bankName: string;
  accountNumber: string;
};

export default function MemberCard({
  email,
  name,
  nickName,
  phoneNumber,
  bankName,
  accountNumber,
}: TMember) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useLocalStorage('member_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <div className="flex min-h-7 w-[calc(50%_-_1rem)] items-center justify-evenly rounded-xl p-1 shadow-2xl">
      <div className="space-y-2">
        <div className="h-12 w-12 rounded-full bg-slate-500" />
        <div className="text-center text-xs text-gray-700">{nickName}</div>
      </div>
      <div>
        <Link
          href={`/member/${email}`}
          className="flex flex-col "
          ref={target}
          onClick={() => setScrollY(window.scrollY)}
        >
          {visible && (
            <>
              <div className="mt-2 text-base font-bold">{email}</div>
              <div className="flex space-x-1">
                <div className="text-sm text-gray-700">{name}</div>
                <div className="text-sm text-gray-700">{phoneNumber}</div>
              </div>
              <div className="space-x-1">
                <span className="text-sm text-gray-700">{bankName}</span>
                <span className="text-sm text-gray-700">{accountNumber}</span>
              </div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
