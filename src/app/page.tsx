'use client';

import TopBanner from '@components/index/TopBanner';
import { IRecruitItem } from '../types/order';
import OrderRecruitCard from '@components/order/OrderRecruitCard';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import React, { useEffect, useRef } from 'react';
import { useInfiniteOrders } from '@libs/hooks/services/queries/order';
import useLocalStorage from 'use-local-storage';
import { useObserver } from '@libs/client/useObserver';

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
    <Layout title="오늘의주문" hasTabBar>
      <TopBanner />

      {orders.status === 'loading' && (
        <div className="flex items-center justify-center">
          <div
            className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {orders.status === 'success' &&
          orders.data.pages.map((group: any, index: number) => (
            <ul key={index}>
              {group.data.data.list.map((data: IRecruitItem, index: number) => {
                return (
                  <OrderRecruitCard
                    key={index}
                    orderId={data.orderId}
                    orderMemberName={data.orderMemberName}
                    shopName={data.shopName}
                    title={data.title}
                    lastOrderTime={data.lastOrderTime}
                    orderStatus={data.orderStatus}
                    groupCount={data.groupCount}
                  />
                );
              })}
            </ul>
          ))}
        <div ref={bottom} />
      </div>

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
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default Home;
