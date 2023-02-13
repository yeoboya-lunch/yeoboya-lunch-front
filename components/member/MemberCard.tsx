import {useRef, useState} from 'react';
import Link from 'next/link';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';

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

  const [scrollY, setScrollY] = useLocalStorage('poke_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <Link
      href={`/member/${email}`}
      className="pt-4 block  px-4"
      ref={target}
      onClick={() => setScrollY(window.scrollY)}
    >
      {visible && (
        <>
          <h1 className="text-2xl mt-2 font-bold text-gray-900">{email}</h1>
          <span className="text-gray-700 text-sm">{name}</span>
          <span className="text-gray-700 text-sm">{nickName}</span>
          <span className="text-gray-700 text-sm">{phoneNumber}</span>
          <span className="text-gray-700 text-sm">{bankName}</span>
          <span className="text-gray-700 text-sm">{accountNumber}</span>
        </>
      )}
    </Link>
  );
}
