'use client';

import { useRecoilValue } from 'recoil';

import { useHistoryRecruitQuery } from '@/app/_queries/history/historyQueries';
import RecruitHistoryItem from '@/app/history/recruit/_components/RecruitHistoryItem';
import Layout from '@/components/layout';
import memberAtom from '@/libs/recoil/member';

const RecruitHistoryPage = () => {
  const { email } = useRecoilValue(memberAtom);
  const { data } = useHistoryRecruitQuery(email ?? '');

  return (
    <Layout title="주문 모집 내역" canGoBack className="p-0">
      <div className="flex flex-col gap-4 bg-muted">
        {data?.map((recruit) => <RecruitHistoryItem key={recruit.orderId} recruit={recruit} />)}
      </div>
    </Layout>
  );
};

export default RecruitHistoryPage;
