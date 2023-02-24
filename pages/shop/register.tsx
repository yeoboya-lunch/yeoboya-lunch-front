import type {NextPage} from 'next';
import Layout from '@components/layout';
import profilePic from '../../public/image-4@2x.jpg';
import {useInfiniteShops} from '@libs/hooks/services/queries/shop';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import ShopCard from '@components/shop/ShopCard';

const Register: NextPage = () => {
  return (
    <Layout canGoBack title="식당등록">
      <div>식당등록</div>
    </Layout>
  );
};

export default Register;