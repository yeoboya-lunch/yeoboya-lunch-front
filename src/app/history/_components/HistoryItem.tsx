import { HistoryJoinResponse } from '@/app/_queries/history/historyQueries';

type Props = {
  recruit: HistoryJoinResponse;
};
const HistoryItem = ({ recruit }: Props) => {
  const { orderItem, title, totalPrice } = recruit;
  if (orderItem.length === 0) return null;

  return (
    <article className="bg-white py-2">
      <p className="font-medium text-gray-400">주문 날짜</p>
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{totalPrice}원</p>
      <div className="my-2 border-y-2 py-2">
        <p className="font-medium text-gray-400">주문 목록</p>
        {orderItem.map((item, index) => (
          <dl key={index} className="flex justify-between">
            <dt>
              {item.itemName} X {item.orderQuantity}
            </dt>
            <dd>{item.totalPrice}원</dd>
          </dl>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>별점</div>
        <button className="rounded bg-primary px-2 py-1 text-primary-foreground">리뷰 작성</button>
      </div>
    </article>
  );
};

export default HistoryItem;
