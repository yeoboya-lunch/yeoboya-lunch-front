'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';

import { useInfiniteOrders } from '@/app/_queries/order/orderQueries';
import FloatingButton from '@/components/floating-button';
import TopBanner from '@/components/index/TopBanner';
import Layout from '@/components/layout';
import OrderRecruitCard from '@/components/order/OrderRecruitCard';
import { Order } from '@/domain/order';
import { useObserver } from '@/libs/client/useObserver';

const Home = () => {
  const { fetchNextPage, status, data } = useInfiniteOrders();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('order_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

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
    <Layout title="오늘의주문" hasTabBar className="gap-8">
      <TopBanner />

      {status === 'success' &&
        data.pages.map((group, index) => (
          <ul className="flex flex-col gap-4" key={index}>
            {group.list.map((data: Order, index: number) => {
              return (
                <Link href={`/order/${data.orderId}`} key={index} scroll={false}>
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

      <FloatingButton href="/shop">
        <PlusIcon className="h-6 w-6" />
      </FloatingButton>
    </Layout>
  );
};

export default Home;
