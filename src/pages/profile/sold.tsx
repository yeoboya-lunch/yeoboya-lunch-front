import type {NextPage} from 'next';
import Item from '@components/item';
import Layout from '@components/layout';
import {useInfiniteOrders} from '@libs/hooks/services/queries/order';
import {useRecoilValue} from 'recoil';
import memberAtom from '@libs/recoil/member';
import OrderRecruitCard from '@components/order/OrderRecruitCard';
import {IRecruitItem} from '../../types/order';

const Sold: NextPage = () => {
  const member = useRecoilValue(memberAtom);
  const orders = useInfiniteOrders({
    orderEmail: member.email,
  });

  return (
    <Layout title="주문내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {/*{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (*/}
        {/*  <Item id={i} key={i} title="iPhone 14" price={99} comments={1} hearts={1} />*/}
        {/*))}*/}

        {orders.status === 'success' &&
          orders.data.pages.map((group: any, index: number) => (
            <ul key={index}>
              {group.data.data.list.map((data: IRecruitItem, index: number) => {
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
