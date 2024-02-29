'use client';

import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import type { Recruit } from '@/domain/order';
import memberAtom from '@/libs/recoil/member';
import { useOrderStartRecruit } from '@/app/_features/order/orderMutations';

const OrderPage: NextPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const { mutate, isSuccess, isError, isPending, error } = useOrderStartRecruit();

  const iMember = useRecoilValue(memberAtom);

  useEffect(() => {
    const dateControl = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    dateControl.value = dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm');
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Recruit>({
    mode: 'onSubmit',
  });

  const onValid = (recruitForm: Recruit) => {
    recruitForm.email = iMember.email!;
    recruitForm.shopName = search.get('shopName') || '';
    recruitForm.lastOrderTime = (
      document.querySelector('input[type="datetime-local"]') as HTMLInputElement
    ).value;
    mutate(recruitForm);
  };

  useEffect(() => {
    if (isError) {
      setError('deliveryFee', { type: 'focus', message: error.message }, { shouldFocus: true });
    }
    if (isSuccess) {
      router.push('/');
    }
  }, [isPending]);

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout canGoBack title="오늘의 주문">
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

export default OrderPage;
