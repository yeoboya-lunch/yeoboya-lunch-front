'use client';

import { useInfiniteMemberList } from 'app/_queries/member/memberQueries';
import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import Layout from '@/components/layout';
import MemberCard from '@/components/member/MemberCard';
import { useObserver } from '@/libs/client/useObserver';

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
  }, [scrollY]);

  return (
    <Layout canGoBack title="당직자">
      {member.status === 'pending' && <p>불러오는 중</p>}

      {member.status === 'success' &&
        member.data.pages.map((group, index) => (
          <div className="mb-2 flex flex-wrap gap-4" key={index}>
            {group.data.list.map((data, index) => {
              return (
                <MemberCard
                  key={index}
                  loginId={data.loginId}
                  name={data.name}
                  nickName={data.nickName}
                  phoneNumber={data.phoneNumber}
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
