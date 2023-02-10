import type {NextPage} from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import {useInfiniteMemberList} from '@libs/hooks/services/queries/member';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';

type TMember = {
  email: string;
  name: string;
  nickName: string;
  phoneNumber: string;
  accountNumber: string;
  bankName: string;
};

const Member: NextPage = () => {
  const member = useInfiniteMemberList();
  console.log(member.fetchNextPage);
  console.log(member.data?.pages[0].data.data.list);

  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('member_list_scroll', 0);

  const onIntersect = ([entry]) => entry.isIntersecting && member.fetchNextPage;

  useObserver({
    ref: true,
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== '0') window.scrollTo(0, Number(scrollY));
  }, []);

  return (
    <Layout canGoBack title="당직자">
      <div className=" divide-y-[1px] space-y-4">
        {member.data?.pages[0].data.data.list?.map((data: TMember, i: number) => (
          <Link
            key={i}
            href={`/member/${member.data?.pages[0].data.data.list.email}`}
            className="pt-4 block  px-4"
          >
            <h1 className="text-2xl mt-2 font-bold text-gray-900">
              {member.data?.pages[0].data.data.list.name}
            </h1>
            <span>{member.data?.pages[0].data.data.list.email}</span>
            <span>{member.data?.pages[0].data.data.list.nickName}</span>
            <span>{member.data?.pages[0].data.data.list.bankName}</span>
            <span>{member.data?.pages[0].data.data.list.accountNumber}</span>
          </Link>
        ))}
      </div>
      <div ref={bottom} />
    </Layout>
  );
};

export default Member;
