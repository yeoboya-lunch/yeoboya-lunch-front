'use client';

import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { FocusEventHandler, KeyboardEventHandler, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/app/_components/ui/Input';
import { TagInput } from '@/app/_components/ui/TagInput';
import { Textarea } from '@/app/_components/ui/Textarea';
import { useBoardWrite } from '@/app/_queries/board/boardMutations';
import Button from '@/components/button';
import Layout from '@/components/layout';
import { Board } from '@/domain/board';

const WritePage: NextPage = () => {
  const board = useBoardWrite();
  const { data: session } = useSession();
  const [tag, setTag] = useState<Board['hashTags']>([]);

  const onValidBoard: SubmitHandler<Board> = (validForm) => {
    validForm.email = session?.token.subject ?? '';
    validForm.hashTags = tag;
    board.mutate(validForm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Board>({
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
          {...register('hashTags', {})}
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

        <Button text={board.isPending ? 'Loading' : 'Write'} />
      </form>
    </Layout>
  );
};

export default WritePage;
