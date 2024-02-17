import React from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/app/_components/ui/Carousel';

export default function TopBanner() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <section className="container mx-auto mt-1 flex w-full flex-col items-center justify-center">
            <div className="mb-2 w-full rounded-md border bg-white px-4 py-5 shadow dark:bg-gray-800 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                여보야 점심메뉴 시스템
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
                점심 같이 먹어요~
              </p>
            </div>
          </section>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
