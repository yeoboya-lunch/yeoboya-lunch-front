'use client';

import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { FocusEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import useBoardWrite from '@/app/community/write/queries';
import Button from '@/components/button';
import Layout from '@/components/layout';
import { Input } from '@/app/_components/ui/Input';
import { Textarea } from '@/app/_components/ui/Textarea';
import { TagInput } from '@/app/_components/ui/TagInput';

const WritePage: NextPage = () => {
  const board = useBoardWrite();
  const { data: session } = useSession();
  const [tag, setTag] = useState<string[]>([]);

  const onValidBoard = (validForm: WriteFormData) => {
    validForm.email = session?.token.subject;
    validForm.hashTag = tag;
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

  const createTag = (value: string) => {
    if (!tag.includes(value) && value !== '') {
      setTag([...tag, value]);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    createTag(event.target.value);
    event.target.value = '';
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (event.nativeEvent.key === 'Enter') {
      event.preventDefault();
      createTag(event.target.value);
      event.target.value = '';
    }
  };

  useEffect(() => {}, []);

  return (
    <Layout canGoBack title="Write Post">
      <form
        onSubmit={handleSubmit(onValidBoard, onInvalid)}
        className="flex h-full flex-col space-y-4 p-4"
      >
        <Input
          variant="borderNone"
          className="border-b-[1px] pb-1 text-2xl"
          {...register('title', {
            required: '제목은 필수 입력입니다.',
          })}
          placeholder="제목을 입력해주세요."
          type="text"
          required
        />
        {errors.title && (
          <p role="alert" className="text-sm text-red-500">
            {errors.title?.message}
          </p>
        )}

        <TagInput
          {...register('hashTag', {})}
          tags={tag}
          onKeyDown={handleEnter}
          onBlur={handleBlur}
          name="hashTag"
          placeholder="태그를 입력해주세요."
        />

        <Textarea
          {...register('content', {
            required: '내용은 필수 입력입니다.',
          })}
          className="h-full border-none p-0 text-lg shadow-none focus-visible:ring-0 "
        />
        {errors.content && (
          <p role="alert" className="text-sm text-red-500">
            {errors.content?.message}
          </p>
        )}

        <Button text={board.isLoading ? 'Loading' : 'Write'} />
      </form>
    </Layout>
  );
};

export default WritePage;
