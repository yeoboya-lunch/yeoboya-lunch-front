'use client';
import { useRecoilValue } from 'recoil';

import { useHistoryJoinQuery } from '@/app/_queries/history/historyQueries';
import HistoryItem from '@/app/history/_components/HistoryItem';
import Layout from '@/components/layout';
import memberAtom from '@/libs/recoil/member';

const list = [
  {
    title: 'title',
    orderItem: [
      {
        itemName: 'itemName',
        orderQuantity: 1,
        totalPrice: 1000,
      },
    ],
    totalPrice: 1000,
  },
  {
    title: 'title',
    orderItem: [
      {
        itemName: 'itemName',
        orderQuantity: 1,
        totalPrice: 1000,
      },
    ],
    totalPrice: 1000,
  },
];

const JoinHistoryPage = () => {
  const { email } = useRecoilValue(memberAtom);
  const { data } = useHistoryJoinQuery(email ?? '');

  return (
    <Layout className="p-0" title="주문 참여 내역" canGoBack>
      <div className="flex flex-col gap-4 bg-muted">
        {list.map((recruit, index) => (
          <HistoryItem key={index} recruit={recruit} />
        ))}
      </div>
    </Layout>
  );
};

export default JoinHistoryPage;
