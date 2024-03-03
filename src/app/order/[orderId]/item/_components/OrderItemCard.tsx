'use client';

import Image from 'next/image';
import { useState } from 'react';

import defaultImg from '/public/image-4@2x.jpg';
import { Button } from '@/app/_components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/Card';
import Counter from '@/app/_components/ui/Counter';
import { ShopItem } from '@/domain/shop';

type Props = {
  item: ShopItem;
};

const OrderItemCard = ({ item }: Props) => {
  const [itemCount, setItemCount] = useState(0);

  const handlePlusClick = () => {
    setItemCount((prev) => prev + 1);
  };

  const handleMinusClick = () => {
    setItemCount((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Image
            className="my-auto rounded-md object-cover"
            src={defaultImg.src}
            alt="메뉴"
            width={80}
            height={80}
            priority={false}
          />
          <CardDescription className="flex flex-col justify-between">
            설명
            <span className="text-base">
              <strong className="font-semibold">{item.price}</strong> 원
            </span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="flex gap-2">
          <Button variant="outline">옵션 변경</Button>
          <Counter value={itemCount} onIncrement={handlePlusClick} onDecrement={handleMinusClick} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderItemCard;
