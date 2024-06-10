import Link from 'next/link';

import { HistoryJoinResponse } from '@/app/_queries/history/historyQueries';

type Props = {
  recruit: HistoryJoinResponse;
};
const JoinHistoryItem = ({ recruit }: Props) => {
  const { orderItem, title, totalPrice, orderId } = recruit;
  if (orderItem.length === 0) return null;

  return (
    <article className="bg-white py-2">
      <Link href={`/order/${orderId}`} className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">주문 날짜</p>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{totalPrice}원</p>
        <div className="flex flex-col gap-0.5 border-t-2 py-2">
          <p className="font-medium text-muted-foreground">주문 목록</p>
          {orderItem.map((item, index) => (
            <dl key={index} className="flex justify-between">
              <dt>
                {item.itemName} X {item.orderQuantity}
              </dt>
              <dd>{item.totalPrice}원</dd>
            </dl>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default JoinHistoryItem;
