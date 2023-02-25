import type {NextPage} from 'next';
import Layout from '@components/layout';
import profilePic from '../../public/image-4@2x.jpg';
import {useInfiniteShops} from '@libs/hooks/services/queries/shop';
import {useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';
import {useObserver} from '@libs/client/useObserver';
import ShopCard from '@components/shop/ShopCard';
import Input from '@components/input';
import Button from '@components/button';
import {FieldErrors, useForm} from 'react-hook-form';
import {IShop} from '../../types/shop';
import {useRouter} from 'next/router';
import {useShopRegister} from '@libs/hooks/services/mutations/shop';

const Register: NextPage = () => {
  const shopRegister = useShopRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<IShop>({
    mode: 'onSubmit',
  });

  const onValid = (shopForm: IShop) => {
    shopRegister.mutate(shopForm);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const router = useRouter();
  useEffect(() => {
    if (shopRegister.isError) {
      console.log(shopRegister);
    }
    if (shopRegister.isSuccess) {
      router.push('/');
    }
  }, [shopRegister.isLoading]);

  return (
    <Layout canGoBack title="식당등록">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="p-4 space-y-4">
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register('shopName', {
            required: true,
          })}
          label="상점이름"
          name="shopName"
          type="text"
        />
        <Button text="식당등록" />
      </form>
    </Layout>
  );
};

export default Register;