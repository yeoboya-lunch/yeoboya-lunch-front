import {useRef, useState} from 'react';
import Link from 'next/link';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import Image from 'next/image';

type TShop = {
  shopName: string;
  image: string;
};

export default function ShopCard({shopName, image}: TShop) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useLocalStorage('shop_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <div className="w-[calc(50%_-_1rem)] p-1 rounded-xl min-h-7 shadow-2xl flex items-center justify-evenly">
      <div>
        <Link
          href={`/order?shopName=${shopName}`}
          className="flex flex-col "
          ref={target}
          onClick={() => setScrollY(window.scrollY)}
        >
          {visible && (
            <>
              <Image className="rounded-full" src={image} alt="image description" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
