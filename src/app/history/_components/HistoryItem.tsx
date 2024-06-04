import { HistoryJoinResponse } from '@/app/_queries/history/historyQueries';

type Props = {
  recruit: HistoryJoinResponse;
};
const HistoryItem = ({ recruit }: Props) => {
  const { orderItem, title, totalPrice } = recruit;
  if (orderItem.length === 0) return null;

  return (
    <article className="bg-white py-2">
      <h4>{title}</h4>
      <div className="my-2 rounded border border-gray-300 p-2">
        {orderItem.map((item, index) => (
          <dl key={index} className="flex justify-between">
            <dt>
              {item.itemName} X {item.orderQuantity}
            </dt>
            <dd>{item.totalPrice}원</dd>
          </dl>
        ))}
      </div>
      <p>총 결제 금액: {totalPrice}원</p>
      <div className="flex justify-between">
        <div>별점</div>
        <button>리뷰 작성</button>
      </div>
    </article>
  );
};

export default HistoryItem;
