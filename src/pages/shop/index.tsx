import type {NextPage} from 'next';
import Layout from '@components/layout';
import profilePic from '../../public/image-4@2x.jpg';
import {useInfiniteShops} from '@libs/hooks/services/queries/shop';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import ShopCard from '@components/shop/ShopCard';

type TShop = {
  shopName: string;
  image: string;
};

const Index: NextPage = () => {
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
      {shop.status === 'loading' && <p>불러오는 중</p>}

      {shop.status === 'success' &&
        shop.data.pages.map((group: any, index: number) => (
          <div className="flex flex-wrap gap-4 mb-2" key={index}>
            {group.data.data.list.map((data: TShop, index: number) => {
              return <ShopCard key={index} shopName={data.shopName} image={''} />;
            })}
          </div>
        ))}

      <div ref={bottom} />
      {shop.isFetchingNextPage && (
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

export default Index;
