'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import FloatingButton from '@/components/floating-button';
import TopBanner from '@/components/index/TopBanner';
import Layout from '@/components/layout';
import OrderRecruitCard from '@/components/order/OrderRecruitCard';
import { useObserver } from '@/libs/client/useObserver';
import { useInfiniteOrders } from '@/libs/hooks/services/queries/order';

import { IRecruitItem } from '@/domain/order';

const Home = () => {
  const orders = useInfiniteOrders();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('order_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && orders.fetchNextPage();
  };

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
    <Layout title="오늘의주문" hasTabBar className="gap-8">
      <TopBanner />

      {orders.status === 'pending' && (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {orders.status === 'success' &&
        orders.data.pages.map((group: any, index: number) => (
          <ul className="flex flex-col gap-4" key={index}>
            {group.data.data.list.map((data: IRecruitItem, index: number) => {
              return (
                <Link href={`/order/${data.orderId}`} key={index}>
                  <OrderRecruitCard
                    orderMemberName={data.orderMemberName}
                    shopName={data.shopName}
                    title={data.title}
                    lastOrderTime={data.lastOrderTime}
                    orderStatus={data.orderStatus}
                    groupCount={data.groupCount}
                  />
                </Link>
              );
            })}
          </ul>
        ))}
      <div ref={bottom} />

      {orders.isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <FloatingButton href="/shop">
        <PlusIcon className="h-6 w-6" />
      </FloatingButton>
    </Layout>
  );
};

export default Home;
