import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Cart, useOrderRecruitGroupJoin } from '@/app/_queries/order/orderMutations';
import { RecruitResponse, useRecruitQuery } from '@/app/_queries/order/orderQueries';
import { GroupOrder, OrderItem } from '@/domain/order';
import { User } from '@/domain/user';
import memberAtom from '@/libs/recoil/member';

const findMyCart = (recruit: RecruitResponse | undefined, email: User['email']) => {
  return recruit?.group.find((user) => email === user.email);
};

const findOrderItem = (
  items: GroupOrder['orderItem'] | undefined,
  itemName: OrderItem['itemName'],
) => {
  return items?.find((item) => item.itemName === itemName);
};

export const useOrderItems = (orderId: string) => {
  const member = useRecoilValue(memberAtom);
  const email = member.email as string;

  const { data: recruit } = useRecruitQuery(orderId);
  const existsData = !!recruit?.group.find((user) => user.email === email);
  const { mutate } = useOrderRecruitGroupJoin(existsData);

  const initCart: GroupOrder = {
    email: '',
    name: '',
    orderItem: [],
    totalPrice: 0,
    orderId: parseInt(orderId),
    groupOrderId: parseInt(orderId),
    title: '',
  };

  const [myOrder, setMyOrder] = useState(() => findMyCart(recruit, email) ?? initCart);

  const updateQuantity = ({ itemName, quantity }: { itemName: string; quantity: number }) => {
    if (!recruit?.shop) return;
    setMyOrder((prev) => {
      const orderItem = recruit.shop.items.map((item) => {
        if (item.name === itemName && quantity >= 0) {
          return {
            itemName: item.name,
            orderPrice: item.price,
            orderQuantity: quantity,
            totalPrice: item.price * quantity,
          };
        }
        return (
          prev.orderItem.find((v) => v.itemName === item.name) ?? {
            itemName: item.name,
            orderPrice: item.price,
            orderQuantity: 0,
            totalPrice: 0,
          }
        );
      });
      return {
        ...myOrder,
        orderItem,
        totalPrice: orderItem.reduce((acc, cur) => {
          return acc + (cur?.totalPrice ?? 0);
        }, 0),
      };
    });
  };

  const handleSubmit = (orderItems: Cart[]) => {
    if (!orderItems) return;
    if (existsData) {
      mutate({ orderId, orderItems, groupOrderId: myOrder.groupOrderId });
      return;
    }
    mutate({ email, orderId, orderItems });
  };

  return {
    myOrder,
    shopItems: recruit?.shop.items,
    updateQuantity,
    findOrderItem,
    handleSubmit,
  };
};
