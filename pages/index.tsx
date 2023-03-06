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
import {useSession} from 'next-auth/react';

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
  const {data: session} = useSession();
  console.log(session);
  useEffect(() => {
    if (session) {
      console.log(';;');
    }
  }, []);

  const orders = useInfiniteOrders();
  const bottom = useRef(null);
  const [scrollY] = useLocalStorage('order_list_scroll', 0);

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
      <div className="container flex flex-col items-center justify-center w-full mx-auto">
        <div className="w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            여보야 점심메뉴 시스템
          </h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
            점심 같이 먹어요~
          </p>
        </div>
      </div>

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
