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
    <div className="w-[calc(50%_-_1rem)] p-1 rounded-xl min-h-7 shadow-2xl flex items-center justify-evenly">
      <div className="space-y-2">
        <div className="w-12 h-12 rounded-full bg-slate-500" />
        <div className="text-gray-700 text-xs text-center">{nickName}</div>
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
              <div className="text-base mt-2 font-bold">{email}</div>
              <div className="flex space-x-1">
                <div className="text-gray-700 text-sm">{name}</div>
                <div className="text-gray-700 text-sm">{phoneNumber}</div>
              </div>
              <div className="space-x-1">
                <span className="text-gray-700 text-sm">{bankName}</span>
                <span className="text-gray-700 text-sm">{accountNumber}</span>
              </div>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
