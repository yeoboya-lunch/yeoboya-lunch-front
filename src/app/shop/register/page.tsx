'use client';

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { useShopRegister } from '@/app/_queries/shop/shopMutations';
import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import { Shop } from '@/domain/shop';

const ShopRegisterPage: NextPage = () => {
  const shopRegister = useShopRegister();

  const { register, unregister, handleSubmit } = useForm<Shop>({
    mode: 'onSubmit',
  });

  const onValid = (shopForm: Shop) => {
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
  }, [shopRegister.isPending]);

  const [inputFields, setInputFields] = useState([
    {
      'items.0.itemName': '',
      'items.0.price': 0,
    },
  ]);

  const addFields = (e: SyntheticEvent) => {
    e.preventDefault();
    const newField = {};
    // @ts-ignore
    setInputFields([...inputFields, newField]);
  };

  const removeFields = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = [...inputFields];
    unregister(`items.${data.length - 1}.itemName`);
    unregister(`items.${data.length - 1}.price`);
    data.splice(data.length - 1, 1);
    setInputFields(data);
  };

  return (
    <Layout canGoBack title="식당등록">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4 p-4">
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
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

        <div className="space-y-4 divide-y-[2px] divide-dashed rounded-md border p-3">
          {inputFields.map((input, index) => {
            return (
              <div key={index} className="space-y-4 pt-4">
                <Input
                  register={register(`items.${index}.itemName`, {
                    required: true,
                  })}
                  label={`${index + 1}번째 메뉴`}
                  name={`items.${index}.itemName`}
                  type="text"
                />
                <Input
                  register={register(`items.${index}.price`, {
                    required: true,
                  })}
                  label={`${index + 1}번째 메뉴 가격`}
                  name={`items.${index}.price`}
                  type="text"
                  kind="price"
                />
              </div>
            );
          })}

          <div className="flex justify-evenly pt-4">
            <button
              type="button"
              className="mb-2 mr-2 rounded-lg border border-green-700 px-5 py-2.5 text-center text-sm font-medium text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
              onClick={addFields}
            >
              메뉴추가
            </button>
            {inputFields.length > 0 && (
              <button
                type="button"
                className="mb-2 mr-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                onClick={removeFields}
              >
                메뉴삭제
              </button>
            )}
          </div>
        </div>

        <Button text="식당등록" />
      </form>
    </Layout>
  );
};

export default ShopRegisterPage;
