'use client';

import { ImageIcon } from '@radix-ui/react-icons';
import { useLoginId } from 'app/member/useMemberStore';
import dayjs from 'dayjs';
import type { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { useStartOrderRecruit } from '@/app/_queries/order/orderMutations';
import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import type { Recruit } from '@/domain/order';

const OrderPage: NextPage = () => {
  const search = useSearchParams();
  const { mutate, error } = useStartOrderRecruit();

  const loginId = useLoginId();

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
    recruitForm.loginId = loginId;
    recruitForm.shopName = search.get('shopName') || '';
    recruitForm.lastOrderTime = (
      document.querySelector('input[type="datetime-local"]') as HTMLInputElement
    ).value;
    mutate(recruitForm, {
      onError: () =>
        setError('deliveryFee', { type: 'focus', message: error?.message }, { shouldFocus: true }),
    });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout canGoBack title="오늘의 주문">
      <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4 p-4">
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500">
            <ImageIcon className="h-12 w-12" />
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
