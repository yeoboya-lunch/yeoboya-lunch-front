'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { useEndOrderRecruit, useOrderRecruitGroupJoin } from '@/app/_queries/order/orderMutations';
import { useRecruitQuery } from '@/app/_queries/order/orderQueries';
import Layout from '@/components/layout';
import { Order } from '@/domain/order';
import UserOrderCard from '@/app/order/[orderId]/_components/UserOrderCard';

type Props = {
  params: {
    orderId: string;
  };
};

const RecruitPost = ({ params }: Props) => {
  const { data: session } = useSession();
  const { data: recruit } = useRecruitQuery(params.orderId);
  const orderRecruitJoin = useOrderRecruitGroupJoin();
  const orderRecruitExit = useEndOrderRecruit();

  const [cart, setCart] = useState<Order[]>([]);

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
    <Layout title="주문 파티 모집" className="gap-2" canGoBack>
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
        <Link href={`/order/${params.orderId}/item`}>
          <Button className="text-base">메뉴 담기</Button>
        </Link>
        <Button variant="outline" className="bg-muted text-base text-muted-foreground">
          취소하기
        </Button>
      </div>
      <div>
        <h4 className="mb-2 text-xl">주문할 메뉴 목록</h4>
        <ul className="flex flex-col">
          <UserOrderCard />
        </ul>
      </div>
      <div className="mt-auto flex flex-col content-between gap-8 border-t-[1px] bg-white p-2">
        <div className="flex justify-between">
          <dt className="text-lg font-semibold">총 금액</dt>
          <dd className="text-lg font-semibold">얼마? 원</dd>
        </div>
        <Button className="w-full">모집 완료</Button>
      </div>
    </Layout>
  );
};

export default RecruitPost;
