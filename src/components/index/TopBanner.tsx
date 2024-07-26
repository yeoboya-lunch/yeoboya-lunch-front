import { DotFilledIcon } from '@radix-ui/react-icons';
import { cn } from 'app/_lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { ClassNameValue } from 'tailwind-merge';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/Card';
import { Carousel, CarouselContent, CarouselItem } from '@/app/_components/ui/Carousel';

type Props = {
  className?: ClassNameValue;
};
export default function TopBanner({ className }: Props) {
  return (
    <Carousel opts={{ loop: true }} plugins={[Autoplay()]} className={cn(className)}>
      <CarouselContent>
        {Array.from({ length: 2 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="m-4">
              <CardHeader>
                <CardTitle className="text-xl">디자이너 구함미다 ㅠㅅㅠ</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li className="flex items-center gap-2">
                    <DotFilledIcon /> 같이 디자인시스템을 구축하실 분
                  </li>
                  <li className="flex items-center gap-2">
                    <DotFilledIcon /> 못생긴 디자인 함께 뜯어 고치실 분
                  </li>
                </ul>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
