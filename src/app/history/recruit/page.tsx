'use client';

import { useLoginId } from 'app/member/useMemberStore';

import { useHistoryRecruitQuery } from '@/app/_queries/history/historyQueries';
import RecruitHistoryItem from '@/app/history/recruit/_components/RecruitHistoryItem';
import Layout from '@/components/layout';

const RecruitHistoryPage = () => {
  const loginId = useLoginId();
  const { data } = useHistoryRecruitQuery(loginId);

  return (
    <Layout title="주문 모집 내역" canGoBack className="p-0">
      <div className="flex flex-col gap-4 bg-muted">
        {data?.map((recruit) => <RecruitHistoryItem key={recruit.orderId} recruit={recruit} />)}
      </div>
    </Layout>
  );
};

export default RecruitHistoryPage;
