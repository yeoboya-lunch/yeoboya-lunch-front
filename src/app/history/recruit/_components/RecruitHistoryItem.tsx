import { Badge } from 'app/_components/ui/Badge';
import { useLoginId } from 'app/member/useMemberStore';
import Link from 'next/link';

import { HistoryRecruitResponse } from '@/app/_queries/history/historyQueries';

type Props = {
  recruit: HistoryRecruitResponse;
};
const RecruitHistoryItem = ({ recruit }: Props) => {
  const { orderId, title, lastOrderTime, joinMember, orderStatus } = recruit;
  const myId = useLoginId();

  const totalPrice = joinMember.reduce((sum, member) => sum + member.totalPrice, 0);

  return (
    <article className="bg-background py-2">
      <Link href={`/order/${orderId}`} className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">{lastOrderTime}</p>
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">{title}</h4>
          <Badge variant={orderStatus === '모집종료' ? 'secondary' : 'default'}>
            {orderStatus}
          </Badge>
        </div>
        {
          <div className="border-t-2 py-2">
            <p className="font-medium text-muted-foreground">참여자</p>
            {joinMember.length > 0
              ? joinMember.map((memberItem) => {
                  const { name, orderId, loginId } = memberItem;
                  return (
                    <ul key={orderId}>
                      <li className="flex gap-4">
                        {name}
                        {loginId === myId ? '(나)' : ''}
                      </li>
                    </ul>
                  );
                })
              : '없음'}
          </div>
        }
        <dl className="flex justify-end gap-2 text-2xl font-semibold">
          <dt>총 금액</dt>
          <dd className="min-w-40 text-end">{totalPrice} 원</dd>
        </dl>
      </Link>
    </article>
  );
};
export default RecruitHistoryItem;
