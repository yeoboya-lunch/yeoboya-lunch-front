import type {NextPage} from 'next';
import Layout from '@components/layout';
import {useInfiniteMemberList} from '@libs/hooks/services/queries/member';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import MemberCard from '@components/member/MemberCard';

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
          <div className="flex flex-wrap gap-4 mb-2" key={index}>
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
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Member;
