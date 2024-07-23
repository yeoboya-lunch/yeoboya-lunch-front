'use client';

import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import Spinner from '@/app/_components/ui/Spinner';
import { useInfiniteShops } from '@/app/_queries/shop/shopQueries';
import Layout from '@/components/layout';
import ShopCard from '@/components/shop/ShopCard';
import { useObserver } from '@/libs/client/useObserver';

const ShopPage: NextPage = () => {
  const shop = useInfiniteShops();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('shop_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && shop.fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  useEffect(() => {
    if (scrollY !== 0) {
      window.scrollTo(0, Number(scrollY));
    }
  }, [scrollY]);

  return (
    <Layout canGoBack title="식당선택">
      {shop.status === 'pending' && <Spinner />}

      {shop.status === 'success' &&
        shop.data.pages.map((group, index: number) => (
          <div className="mb-2 flex flex-wrap gap-4" key={index}>
            {group.data.list.map((data, index: number) => {
              return <ShopCard key={index} shopName={data.shopName} />;
            })}
          </div>
        ))}

      <div ref={bottom} />
    </Layout>
  );
};

export default ShopPage;
