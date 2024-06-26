import Image from 'next/image';
import defaultImg from 'public/defaultImage.jpg';

import { Card, CardContent, CardDescription, CardTitle } from '@/app/_components/ui/Card';
import OverlapProfileGroup from '@/app/order/[orderId]/_components/OverlapProfileGroup';

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

const OrderResultCard = () => {
  return (
    <Card className="flex overflow-hidden">
      <Image className="w-1/4 object-cover" src={defaultImg} alt="메뉴 사진" />
      <CardContent className="flex flex-grow flex-col gap-1 pt-4">
        <CardTitle>메뉴 이름</CardTitle>
        <CardDescription className="mb-2 flex justify-between">
          <span>₩ 메뉴 가격</span>
          <span>인원 수 명</span>
        </CardDescription>
        <div className="flex items-center justify-between">
          <OverlapProfileGroup users={users} count={3} />
          <span className="font-semibold">₩ 가격</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderResultCard;
