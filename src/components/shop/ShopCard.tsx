import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { useObserver } from '@/libs/client/useObserver';

type TShop = {
  shopName: string;
};

export default function ShopCard({ shopName }: TShop) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <div className="mt-4 flex w-[calc(50%_-_1rem)] cursor-pointer items-center justify-evenly">
      <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <Link href={`/order?shopName=${shopName}`} className="flex flex-col " ref={target}>
          {visible && (
            <Image
              width={150}
              height={150}
              className="rounded-t-lg"
              alt="image description"
              src="/defaultImage.jpg"
            />
          )}
        </Link>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {shopName}
          </h5>
        </div>
      </div>
    </div>
  );
}
