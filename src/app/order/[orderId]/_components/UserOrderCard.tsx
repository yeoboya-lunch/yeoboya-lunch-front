import defaultImg from 'public/defaultImage.jpg';

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
      <CardHeader className="flex-row items-center gap-2 space-y-0 text-lg">
        <UserProfile src={users[0].image} alt="유저 이름" />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="text- flex flex-col justify-between gap-2 text-lg">
        {items.map((item, index) => {
          const { itemName, orderQuantity, orderPrice, totalPrice } = item;
          return (
            <dl className="flex justify-between" key={index}>
              <dt>{itemName}</dt>
              <div className="flex items-center gap-4 text-base">
                <span>
                  {orderPrice} 원 X {orderQuantity} 개
                </span>
                <dd className="font-medium">합계: {totalPrice} 원</dd>
              </div>
            </dl>
          );
        })}
        <dl className="flex justify-end gap-2 font-semibold">
          <dt>총계:</dt>
          <dd>{items.reduce((sum, item) => item.totalPrice + sum, 0)} 원</dd>
        </dl>
      </CardContent>
    </Card>
  );
};

export default UserOrderCard;
