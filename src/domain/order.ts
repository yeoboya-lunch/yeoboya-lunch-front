import { Shop, ShopItem } from '@/domain/shop';
import { User } from '@/domain/user';

export type Order = {
  orderId: number;
  title: string;
  orderMemberName: User['name'];
  orderMemberEmail: User['email'];
  shopName: Shop['shopName'];
  lastOrderTime: string;
  orderStatus: '모집시작' | '모집종료' | '주문완료' | '주문취소';
  groupCount: number;
};

export type UserOrder = {
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
  email: User['email'];
  name: User['name'];
  totalPrice: number;
};

export type Recruit = {
  email: User['name'];
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
