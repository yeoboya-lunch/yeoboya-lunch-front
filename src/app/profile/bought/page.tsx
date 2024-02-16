'use client';

import type { NextPage } from 'next';
import Item from '@/components/item';
import Layout from '@/components/layout';
import { useRecoilValue } from 'recoil';
import memberAtom from '@/libs/recoil/member';
import { useInfinitePurchaseRecruits } from '@/libs/hooks/services/queries/order';
import { IRecruitItem } from '../../../types/order';

const Bought: NextPage = () => {
  const member = useRecoilValue(memberAtom);
  const orders = useInfinitePurchaseRecruits({
    orderEmail: member.email,
  });

  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        {orders.status === 'success' &&
          orders.data.pages.map((group: any, index: number) => (
            <ul key={index}>
              {group.data.data.list.map((data: IRecruitItem, index: number) => {
                return (
                  <Item
                    key={index}
                    id={index}
                    title="iPhone 14"
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

export default Bought;
