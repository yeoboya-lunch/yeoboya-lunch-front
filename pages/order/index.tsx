import type {NextPage} from 'next';
import Button from '@components/button';
import Input from '@components/input';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import {useRouter} from 'next/router';
import {useOrderStartRecruit} from '@libs/hooks/services/mutations/order';
import {FieldErrors, useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';

interface Recruit {
  email: string;
  shopName: string;
  title: string;
  deliveryFee: number;
  lastOrderTime: string;
  memo: string;
}

const Index: NextPage = () => {
  const router = useRouter();
  const {mutate, isSuccess, isError, isLoading, error} = useOrderStartRecruit();

  useEffect(() => {
    const dateControl = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    dateControl.value = dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm');
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<Recruit>({
    mode: 'onSubmit',
  });

  const onValid = (recruitForm: Recruit) => {
    recruitForm.email = '1@1.1';
    recruitForm.shopName = router.query.shopName as string;
    recruitForm.lastOrderTime = (
      document.querySelector('input[type="datetime-local"]') as HTMLInputElement
    ).value;
    console.log(recruitForm);
    mutate(recruitForm);
  };

  useEffect(() => {
    if (isError) {
      setError(
        'deliveryFee',
        {type: 'focus', message: error.response.data.message},
        {shouldFocus: true},
      );
      console.log(isError);
    }
    if (isSuccess) {
      router.push({
        pathname: '/',
      });
    }
  }, [isLoading]);

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout canGoBack title="오늘의 주문">
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
          register={register('title', {
            required: true,
          })}
          label="제목"
          name="title"
          type="text"
        />
        <Input
          register={register('deliveryFee', {
            required: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: '숫자만 입력해 주세요',
            },
          })}
          label="배달비 (수정가능)"
          place-Holder="0.00"
          name="deliveryFee"
          type="text"
          kind="price"
        />
        {errors.deliveryFee && (
          <p role="alert" className="text-sm text-red-500">
            {errors.deliveryFee?.message}
          </p>
        )}
        <Input
          register={register('lastOrderTime', {})}
          required
          label="주문마감시간"
          name="lastOrderTime"
          type="datetime-local"
        />
        <TextArea register={register('memo', {})} name="memo" label="주문요청사항" />
        <Button text="주문시작" />
      </form>
    </Layout>
  );
};

export default Index;
