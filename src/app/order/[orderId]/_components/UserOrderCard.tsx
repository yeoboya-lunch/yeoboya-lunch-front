import defaultImg from 'public/defaultImage.jpg';
import { Fragment } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/Card';
import UserProfile from '@/app/_components/ui/user/UserProfile';
import { OrderItems } from '@/app/order/[orderId]/page';
import { User } from '@/domain/user';

const users = [
  {
    image: defaultImg.src,
    name: '라이언1',
  },
  {
    image: defaultImg.src,
    name: '라이언2',
  },
  {
    image: defaultImg.src,
    name: '라이언3',
  },
  {
    image: defaultImg.src,
    name: '라이언4',
  },
];

type Props = {
  name: User['name'];
  items: OrderItems[];
};

const UserOrderCard = ({ name, items }: Props) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <UserProfile src={users[0].image} alt="유저 이름" />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        {items.map((item, index) => {
          const { itemName, orderQuantity, orderPrice, totalPrice } = item;
          return (
            <Fragment key={index}>
              <dt>{itemName}</dt>
              <div className="flex gap-4">
                <span>
                  {orderPrice} 원 X {orderQuantity} 개
                </span>
                <dd className="font-semibold">합계: {totalPrice} 원</dd>
              </div>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UserOrderCard;
