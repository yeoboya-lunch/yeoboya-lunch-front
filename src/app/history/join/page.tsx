'use client';
import { useRecoilValue } from 'recoil';

import { useHistoryJoinQuery } from '@/app/_queries/history/historyQueries';
import JoinHistoryItem from '@/app/history/join/_components/JoinHistoryItem';
import Layout from '@/components/layout';
import memberAtom from '@/libs/recoil/member';

const JoinHistoryPage = () => {
  const { email } = useRecoilValue(memberAtom);
  const { data } = useHistoryJoinQuery(email ?? '');

  return (
    <Layout className="p-0" title="주문 참여 내역" canGoBack>
      <div className="flex flex-col gap-4 bg-muted">
        {data?.list.map((recruit, index) => <JoinHistoryItem key={index} recruit={recruit} />)}
      </div>
    </Layout>
  );
};

export default JoinHistoryPage;
