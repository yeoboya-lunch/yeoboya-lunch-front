import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { Badge } from '@/_components/ui/badge';
import profilePic from '../../../public/image-4@2x.jpg';

interface IRecruitProps {
  orderId: number;
  orderMemberName: string;
  shopName: string;
  title: string;
  lastOrderTime: string;
  orderStatus: string;
  groupCount: number;
}

export default function OrderRecruitCard({
  orderId,
  orderMemberName,
  shopName,
  title,
  lastOrderTime,
  orderStatus,
  groupCount,
}: IRecruitProps) {
  const target = useRef(null);
  return (
    <Link href={`/order/${orderId}`} ref={target}>
      <Card className="flex h-full w-full border-0 shadow-none">
        <Image
          className="flex-[1_1_0] rounded-xl object-cover"
          src={profilePic}
          width={160}
          height={160}
          alt="기본이미지"
        />
        <div className="ml-2 flex-[3_1_0]">
          <CardHeader className="p-2">
            <CardTitle className="text-xl">{shopName}</CardTitle>
            <div className="flex justify-between">
              <div className="items-center justify-between space-x-0.5 text-sm text-gray-600">
                현재&nbsp;
                <b className="text-sm text-gray-600">{groupCount}</b>명 모집 중이에요!
              </div>
              <Badge>{orderStatus}</Badge>
            </div>
          </CardHeader>
          <CardContent className=" h-16 max-h-20 text-ellipsis px-2 pb-2">
            <CardDescription className="line-clamp-3 max-h-full">{title}</CardDescription>
          </CardContent>
          <CardFooter className="flex w-full justify-between px-2 pb-2">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {orderMemberName}
            </p>
            <time className="text-xs text-gray-600 dark:text-gray-200">{lastOrderTime}</time>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
