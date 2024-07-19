import { Member } from 'domain/member';

import { Shop, ShopItem } from '@/domain/shop';

export type Order = {
  orderId: number;
  title: string;
  orderMemberName: Member['name'];
  orderMemberEmail: Member['email'];
  shopName: Shop['shopName'];
  lastOrderTime: string;
  orderStatus: '모집시작' | '모집종료' | '주문완료' | '주문취소';
  groupCount: number;
};

export type MemberOrder = {
  orderId: number;
  groupOrderId: number;
  title: string;
  email: string;
  name: string;
  orderItem: OrderItem[];
  totalPrice: number;
};

export type OrderItem = {
  itemName: ShopItem['name'];
  orderPrice: ShopItem['price'];
  orderQuantity: number;
  totalPrice: number;
};

export type GroupOrder = {
  groupOrderId: number;
  orderId: number;
  title: string;
  orderItem: OrderItem[];
  email: Member['email'];
  name: Member['name'];
  totalPrice: number;
};

export type Recruit = {
  email: Member['name'];
  shopName: Shop['shopName'];
  title: string;
  deliveryFee: number;
  lastOrderTime: string;
  memo: string;
};

// type OrderItem = {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// };
