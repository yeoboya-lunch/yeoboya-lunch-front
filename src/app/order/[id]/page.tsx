'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import Layout from '@/components/layout';
import {
  useOrderRecruitGroupExit,
  useOrderRecruitGroupJoin,
} from '@/libs/hooks/services/mutations/order';
import { useRecruitQuery } from '@/libs/hooks/services/queries/order';

import { IItem, IRecruitItem } from '../../../types/order';
import { Badge } from '@/app/_components/ui/Badge';

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

  const addCart = (item: any) => {
    // @ts-ignore
    setCart([...cart, { itemName: item.name, orderQuantity: 1 }]);
  };

  const deleteCart = (value: any) => {
    setCart((oldValues) => {
      return oldValues.filter((item) => item != value);
    });
  };

  return (
    <Layout title="주문 파티 모집" canGoBack>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">{recruit?.order.title}</h2>
        <div className="flex w-full items-center justify-center gap-2 font-semibold text-muted-foreground">
          <span className="text-xl">{recruit?.shop.shopName}</span>
          {' | '}
          <Badge>{recruit?.order.orderStatus}</Badge>
        </div>
        <div className="mb-3 flex cursor-pointer items-center">
          <p className="font-medium text-muted-foreground">{recruit?.orderMember.name}</p>
        </div>
        <div className="border-b">
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">마감시간</span>
            <span className="text-xs font-medium text-gray-500">
              {recruit?.order.lastOrderTime}
            </span>
          </div>

          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">배달비</span>
            <span className="text-xs font-medium text-gray-500">{recruit?.order.deliveryFee}</span>
          </div>

          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">당직자 메모</span>
            <span className="text-xs font-medium text-gray-500">{recruit?.order.memo}</span>
          </div>
        </div>
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recruit?.shop.items?.map((item: IItem, index: number) => {
              return (
                <li key={index} className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {item.price}원
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                      onClick={() => addCart(item)}
                    >
                      장바구니 담기
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>{cart.length}</p>
          {cart.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.itemName}</p>
                <button onClick={() => deleteCart(item)}>카트 삭제</button>
              </div>
            );
          })}
        </div>
        ---------------------
        <div
          onClick={() =>
            orderRecruitJoin.mutate({
              orderNo: params.id,
              email: session?.token.subject,
              orderItems: cart,
            })
          }
        >
          주문서 넣기
        </div>
        ---------------------
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recruit?.group.map((group: any, index: number) => {
              return (
                <li key={index} className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      파티원 : {group.name}
                      {group.orderItem.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <p>itemName: {item.itemName}</p>
                            <p>orderQuantity: {item.orderQuantity}</p>
                          </div>
                        );
                      })}
                      {group.totalPrice}
                    </div>
                  </div>
                  {session?.token.subject === group.email && (
                    <button
                      onClick={() => {
                        orderRecruitExit.mutate(group.groupOrderId);
                      }}
                    >
                      주문취소
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitPost;
