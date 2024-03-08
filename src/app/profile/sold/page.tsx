'use client';

import type { NextPage } from 'next';
import { useRecoilValue } from 'recoil';

import { useInfiniteOrders } from '@/app/_queries/order/orderQueries';
import Item from '@/components/item';
import Layout from '@/components/layout';
import memberAtom from '@/libs/recoil/member';

const Sold: NextPage = () => {
  const member = useRecoilValue(memberAtom);
  const orders = useInfiniteOrders({
    page: 1,
    orderEmail: member.email,
  });

  return (
    <Layout title="주문내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        {orders.status === 'success' &&
          orders.data.pages.map((group, index: number) => (
            <ul key={index}>
              {group.data.list.map((data, index: number) => {
                return (
                  <Item
                    id={index}
                    key={index}
                    title={data.orderMemberEmail}
                    price={99}
                    comments={1}
                    hearts={1}
                  />
                );
              })}
            </ul>
          ))}
      </div>
    </Layout>
  );
};

export default Sold;
