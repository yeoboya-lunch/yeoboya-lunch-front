import { Cart, useOrderRecruitGroupJoin } from 'app/_queries/order/orderMutations';
import { RecruitResponse, useRecruitQuery } from 'app/_queries/order/orderQueries';
import { useLoginId } from 'app/member/useMemberStore';
import { Member } from 'domain/member';
import { GroupOrder, OrderItem } from 'domain/order';
import { useState } from 'react';

const findMyCart = (recruit: RecruitResponse | undefined, loginId: Member['loginId']) => {
  return recruit?.group.find((user) => loginId === user.loginId);
};

const findOrderItem = (
  items: GroupOrder['orderItem'] | undefined,
  itemName: OrderItem['itemName'],
) => {
  return items?.find((item) => item.itemName === itemName);
};

export const useOrderItems = (orderId: string) => {
  const loginId = useLoginId();

  const { data: recruit } = useRecruitQuery(orderId);
  const existsData = !!recruit?.group.find((user) => user.loginId === loginId);
  const { mutate } = useOrderRecruitGroupJoin(existsData);

  const initCart: GroupOrder = {
    loginId: '',
    name: '',
    orderItem: [],
    totalPrice: 0,
    orderId: parseInt(orderId),
    groupOrderId: parseInt(orderId),
    title: '',
  };

  const [myOrder, setMyOrder] = useState(() => findMyCart(recruit, loginId) ?? initCart);

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
    mutate({ loginId, orderId, orderItems });
  };

  return {
    myOrder,
    shopItems: recruit?.shop.items,
    updateQuantity,
    findOrderItem,
    handleSubmit,
  };
};
