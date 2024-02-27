export interface IRecruitItem {
  orderId: number;
  orderMemberName: string;
  orderMemberEmail: string;
  shopName: string;
  title: string;
  lastOrderTime: string;
  orderStatus: string;
  groupCount: number;
}

export interface Recruit {
  email: string;
  shopName: string;
  title: string;
  deliveryFee: number;
  lastOrderTime: string;
  memo: string;
}

export interface IRecruitJoin {
  orderNo: string;
  email: string;
  orderItems: IRecruitItem[];
}

export interface IRecruitItem {
  itemName: string;
  orderQuantity: number;
}

export interface IItem {
  name: string;
  price: number;
}
