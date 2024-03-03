import { Shop } from '@/domain/shop';
import { User } from '@/domain/user';

export interface Order {
  orderId: number;
  title: string;
  orderMemberName: User['name'];
  orderMemberEmail: User['email'];
  shopName: Shop['shopName'];
  lastOrderTime: string;
  orderStatus: '모집시작' | '모집종료' | '주문완료' | '주문취소';
  groupCount: number;
}

export type Recruit = {
  email: User['name'];
  shopName: Shop['shopName'];
  title: string;
  deliveryFee: number;
  lastOrderTime: string;
  memo: string;
};

export interface IRecruitItem {
  itemName: string;
  orderQuantity: number;
}

export interface IItem {
  name: string;
  price: number;
}
