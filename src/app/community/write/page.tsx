'use client';

import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';

import useBoardWrite from '@/app/community/write/queries';
import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';

const WritePage: NextPage = () => {
  const board = useBoardWrite();
  const { data: session } = useSession();
  const [tag, setTag] = useState<string[]>([]);

  const onValidBoard = (validForm: WriteFormData) => {
    validForm.email = session?.token.subject;
    validForm.hashTag = tag;
    console.log(validForm);

    board.mutate(validForm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteFormData>({
    defaultValues: {},
  });

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  useEffect(() => {}, []);

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValidBoard, onInvalid)} className="space-y-4 p-4">
        <Input
          register={register('title', {
            required: '제목은 필수 입력입니다.',
          })}
          required
          label="제목"
          name="title"
          type="text"
        />
        {errors.title && (
          <p role="alert" className="text-sm text-red-500">
            {errors.title?.message}
          </p>
        )}
        <Input
          register={register('pin', {
            pattern: {
              value: /\d{3,4}/,
              message: '3자리 또는 4자리 숫자',
            },
          })}
          required
          label="비밀번호 (숫자 3~4자리)"
          name="pin"
          type="password"
        />
        {errors.pin && (
          <p role="alert" className="text-sm text-red-500">
            {errors.pin?.message}
          </p>
        )}

        <TextArea
          register={register('content', {
            required: '내용은 필수 입력입니다.',
          })}
          label="내용"
          name="content"
        />
        {errors.content && (
          <p role="alert" className="text-sm text-red-500">
            {errors.content?.message}
          </p>
        )}

        <TagsInput
          {...register('hashTag', {})}
          value={tag}
          onChange={setTag}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            if (!tag.includes(value) && value !== '') {
              setTag([...tag, value]);
              e.target.value = '';
            }
          }}
          name="hashTag"
          placeHolder="해시태그 입력"
          classNames={{
            tag: '!bg-red-100',
            input:
              'grow placeholder-gray-300 ' +
              'ring-0 border-none ' +
              'focus:ring-0 focus:border-none',
          }}
        />
        <Input label="비공개" name="secret" kind="checkbox" type="checkbox" />
        <Button text={board.isLoading ? 'Loading' : 'Write'} />
      </form>
    </Layout>
  );
};

export default WritePage;
