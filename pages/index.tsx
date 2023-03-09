import type {InferGetStaticPropsType, NextPage, NextPageContext} from 'next';
import FloatingButton from '../components/floating-button';
import Item from '../components/item';
import Layout from '../components/layout';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import {useInfiniteOrders} from '@libs/hooks/services/queries/order';
import ShopCard from '@components/shop/ShopCard';
import profilePic from '../public/image-4@2x.jpg';
import OrderRecruitCard from '@components/order/OrderRecruitCard';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import Button from '@components/button';
import TopBanner from '@components/index/TopBanner';

type TRecruit = {
  orderId: number;
  orderMemberName: string;
  shopName: string;
  title: string;
  lastOrderTime: string;
  orderStatus: string;
  groupCount: number;
};

const Home: NextPage = () => {
  const orders = useInfiniteOrders();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('order_list_scroll', 0);

  const {data: session} = useSession();

  console.log(session);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && orders.fetchNextPage();

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
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
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
              {group.data.data.list.map((data: TRecruit, index: number) => {
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
      </div>
      <div ref={bottom} />
      {orders.isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
