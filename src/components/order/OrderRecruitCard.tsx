import Image from 'next/image';
import defaultImg from 'public/defaultImage.jpg';

import { Badge } from '@/app/_components/ui/Badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/Card';
import { Order } from '@/domain/order';

// type IRecruitProps = {
//   orderMemberName: string;
//   shopName: string;
//   title: string;
//   lastOrderTime: string;
//   orderStatus: Order;
//   groupCount: number;
// };

export default function OrderRecruitCard({
  orderMemberName,
  shopName,
  title,
  lastOrderTime,
  orderStatus,
  groupCount,
}: Omit<Order, 'orderId' | 'orderMemberEmail'>) {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="flex flex-grow-[3] flex-col gap-2 text-ellipsis">
          <div className="flex items-center gap-2">
            <Badge variant={`${orderStatus === '모집종료' ? 'secondary' : 'default'}`}>
              {orderStatus}
            </Badge>
            <CardTitle className="flex-grow text-lg">{shopName}</CardTitle>
          </div>
          <div className="flex justify-between">
            <div className="items-center justify-between space-x-0.5 text-sm text-gray-600">
              현재&nbsp;
              <b className="text-sm text-gray-600">{groupCount}</b>명 모집 중이에요!
            </div>
          </div>
          <CardDescription className="line-clamp-3 h-16 max-h-20">{title}</CardDescription>
        </div>
        <Image
          className="m-auto h-auto flex-[1_1_0] rounded-xl object-cover"
          src={defaultImg}
          width={120}
          height={120}
          priority
          alt="기본이미지"
        />
      </CardHeader>
      <CardFooter className="flex w-full justify-between">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{orderMemberName}</p>
        <time className="text-xs text-gray-600 dark:text-gray-200">{lastOrderTime}</time>
      </CardFooter>
    </Card>
  );
}
