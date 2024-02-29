'use client';

import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import { useInfiniteShops } from '@/app/_features/shop/shopQueries';
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
  }, []);

  return (
    <Layout canGoBack title="식당선택">
      {shop.status === 'pending' && <p>불러오는 중</p>}

      {shop.status === 'success' &&
        shop.data.pages.map((group, index: number) => (
          <div className="mb-2 flex flex-wrap gap-4" key={index}>
            {group.data.list.map((data, index: number) => {
              return <ShopCard key={index} shopName={data.shopName} image={''} />;
            })}
          </div>
        ))}

      <div ref={bottom} />
      {shop.isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ShopPage;
