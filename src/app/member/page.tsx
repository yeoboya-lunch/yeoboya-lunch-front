'use client';

import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import Layout from '@/components/layout';
import MemberCard from '@/components/member/MemberCard';
import { useObserver } from '@/libs/client/useObserver';
import { useInfiniteMemberList } from '@/libs/hooks/services/queries/member';

type TMember = {
  email: string;
  name: string;
  nickName: string;
  phoneNumber: string;
  accountNumber: string;
  bankName: string;
};

const MemberPage: NextPage = () => {
  const member = useInfiniteMemberList();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('member_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && member.fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== 0) {
      window.scrollTo(0, Number(scrollY));
    }
  }, []);

  return (
    <Layout canGoBack title="당직자">
      {member.status === 'loading' && <p>불러오는 중</p>}

      {member.status === 'success' &&
        member.data.pages.map((group: any, index: number) => (
          <div className="mb-2 flex flex-wrap gap-4" key={index}>
            {group.data.data.list.map((data: TMember, index: number) => {
              return (
                <MemberCard
                  key={index}
                  email={data.email}
                  name={data.name}
                  nickName={data.nickName}
                  phoneNumber={data.phoneNumber}
                  bankName={data.bankName}
                  accountNumber={data.accountNumber}
                />
              );
            })}
          </div>
        ))}

      <div ref={bottom} />
      {member.isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MemberPage;
