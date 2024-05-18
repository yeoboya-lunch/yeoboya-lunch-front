import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Cart, useOrderRecruitGroupJoin } from '@/app/_queries/order/orderMutations';
import {
  GroupOrder,
  OrderItem,
  RecruitResponse,
  useRecruitQuery,
} from '@/app/_queries/order/orderQueries';
import { User } from '@/domain/user';

const findMyCart = (recruit: RecruitResponse | undefined, email: User['email']) => {
  return recruit?.group.find((user) => email === user.email);
};

const findOrderItem = (items: GroupOrder['orderItem'] | undefined, itemName: OrderItem['name']) => {
  return items?.find((item) => item.itemName === itemName);
};

export const useOrderItems = (orderId: string) => {
  const { data: session } = useSession();
  const { data: recruit } = useRecruitQuery(orderId);
  const { mutate } = useOrderRecruitGroupJoin();
  const email = session?.token.subject ?? '';

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
        if (item.itemName === itemName && quantity >= 0) {
          return {
            itemName: item.itemName,
            orderPrice: item.price,
            orderQuantity: quantity,
            totalPrice: item.price * quantity,
          };
        }
        return (
          prev.orderItem.find((v) => v.name === item.itemName) ?? {
            itemName: item.itemName,
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
    mutate({ email, orderNo: orderId, orderItems });
  };

  return {
    myOrder,
    shopItems: recruit?.shop.items,
    updateQuantity,
    findOrderItem,
    handleSubmit,
  };
};
