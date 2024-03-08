import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/Card';
import UserProfile from '@/app/_components/ui/user/UserProfile';

import defaultImg from '../../../../../public/image-4@2x.jpg';

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

const UserOrderCard = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <UserProfile src={users[0].image} alt="유저 이름" />
        <CardTitle>유저 이름</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <dt>대충 주문 목록</dt>
        <dd>얼마? 원</dd>
      </CardContent>
    </Card>
  );
};

export default UserOrderCard;
