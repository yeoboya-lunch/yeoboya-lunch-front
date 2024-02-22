'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Layout from '@/components/layout';
import {
  useOrderRecruitGroupExit,
  useOrderRecruitGroupJoin,
} from '@/libs/hooks/services/mutations/order';
import { useRecruitQuery } from '@/libs/hooks/services/queries/order';

import { IRecruitItem } from '../../../types/order';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import OrderCard from '@/app/order/[id]/_components/OrderCard';

type Props = {
  params: {
    id: string;
  };
};

const RecruitPost = ({ params }: Props) => {
  const { data: session } = useSession();
  const { data: recruit } = useRecruitQuery(params.id);
  const orderRecruitJoin = useOrderRecruitGroupJoin();
  const orderRecruitExit = useOrderRecruitGroupExit();

  const [cart, setCart] = useState<IRecruitItem[]>([]);

  const addCart = (item) => {
    // @ts-ignore
    setCart([...cart, { itemName: item.name, orderQuantity: 1 }]);
  };

  const deleteCart = (value) => {
    setCart((oldValues) => {
      return oldValues.filter((item) => item != value);
    });
  };

  return (
    <Layout title="주문 파티 모집" canGoBack>
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-2 font-semibold text-muted-foreground">
          <Badge>{recruit?.order.orderStatus}</Badge>
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
        <span className="my-4 text-center">현재 {cart.length}명 신청 중이에요!</span>
        <div className="mb-8 flex justify-center gap-8">
          <Button className="text-base">주문하기</Button>
          <Button variant="secondary" className="text-base">
            취소하기
          </Button>
        </div>
        <div>
          <h4 className="text-xl">주문 목록</h4>
          <ul className="flex flex-col">
            <OrderCard />
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitPost;
