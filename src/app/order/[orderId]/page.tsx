'use client';

import MemberOrderCard from 'app/order/[orderId]/_components/MemberOrderCard';
import memberAtom from 'libs/recoil/member';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { useEndOrderRecruit, useOrderRecruitCancel } from '@/app/_queries/order/orderMutations';
import { useRecruitQuery } from '@/app/_queries/order/orderQueries';
import Layout from '@/components/layout';

export interface OrderItem {
  orderId: number;
  groupOrderId: number;
  title: string;
  email: string;
  name: string;
  orderItem: OrderItems[];
  totalPrice: number;
}

export interface OrderItems {
  itemName: string;
  orderPrice: number;
  orderQuantity: number;
  totalPrice: number;
}

type Props = {
  params: {
    orderId: string;
  };
};

const RecruitPost = ({ params }: Props) => {
  const { email } = useRecoilValue(memberAtom);
  const { data: recruit } = useRecruitQuery(params.orderId);
  const { mutate } = useEndOrderRecruit();
  const { mutate: cancelMutate } = useOrderRecruitCancel();

  const totalPrice = recruit?.order.joinMember.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const isMyOrder = email === recruit?.orderMember.email;
  const isRecruitEnd = recruit?.order.orderStatus === '모집종료';

  const EndRecruit = () => {
    if (email !== recruit?.orderMember.email) return;
    mutate(params.orderId);
  };

  const handleCancelOrder = () => {
    cancelMutate(params.orderId);
  };
  return (
    <Layout title="주문 파티 모집" className="gap-2" canGoBack>
      <div className="flex w-full items-center gap-2 font-semibold text-muted-foreground">
        <Badge variant={isRecruitEnd ? 'secondary' : 'default'}>{recruit?.order.orderStatus}</Badge>
        <span className="text-sm">{recruit?.shop.shopName}</span>
      </div>
      <h2 className="mb-2 text-3xl">{recruit?.order.title}</h2>
      <p className="flex font-medium">
        <span className="w-1/4 font-medium">작성자</span>
        <span className="flex-grow">{recruit?.orderMember.name}</span>
      </p>
      <div className="flex items-center">
        <span className="w-1/4 font-medium">배달비</span>
        <span className="flex-grow">{recruit?.order.deliveryFee}원</span>
      </div>
      <div className="flex">
        <span className="w-1/4 font-medium">종료 시간</span>
        <span className="flex-grow">{recruit?.order.lastOrderTime} </span>
      </div>
      {!isRecruitEnd && (
        <>
          <span className="my-4 text-center">
            현재 {recruit?.group.length ?? 0}명 신청 중이에요!
          </span>
          <div className="mb-8 flex justify-center gap-8">
            <Button className="text-base">
              <Link href={`/order/${params.orderId}/item`}>메뉴 담기</Link>
            </Button>
            {isMyOrder && (
              <Button
                variant="outline"
                className="bg-muted text-base text-muted-foreground"
                onClick={handleCancelOrder}
              >
                취소하기
              </Button>
            )}
          </div>
        </>
      )}
      <div className="mt-2">
        <h4 className="mb-2 text-xl">메뉴 목록</h4>
        <ul className="flex flex-col gap-4">
          {recruit?.group.map((userOrder) => {
            const { groupOrderId, name, orderItem } = userOrder;
            return <MemberOrderCard key={groupOrderId} name={name} items={orderItem} />;
          })}
        </ul>
      </div>
      <div className="mt-auto flex flex-col content-between gap-8 border-t-[1px] bg-white p-2">
        <div className="flex justify-between text-2xl font-semibold">
          <dt>총 금액</dt>
          <dd>{totalPrice} 원</dd>
        </div>
        {isMyOrder && !isRecruitEnd && (
          <Button className="w-full" onClick={EndRecruit}>
            모집 완료
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default RecruitPost;
