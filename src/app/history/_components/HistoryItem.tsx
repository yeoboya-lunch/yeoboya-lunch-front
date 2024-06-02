import { HistoryJoinResponse } from '@/app/_queries/history/historyQueries';

type Props = {
  recruit: HistoryJoinResponse;
};
const HistoryItem = ({ recruit }: Props) => {
  const { lastOrderTime } = recruit;
  return (
    <article className="bg-white">
      <small>{lastOrderTime}</small>
      <h4>샵 이름</h4>
      <p>주문 내용</p>
      <p>주문 금액</p>
      <div>
        <div>별점</div>
        <button>리뷰 작성</button>
      </div>
    </article>
  );
};

export default HistoryItem;
