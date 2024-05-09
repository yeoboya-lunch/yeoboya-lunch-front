'use client';

import { useReplyWrite } from 'app/_queries/board/boardMutations';
import { useBoardQuery } from 'app/_queries/board/boardQueries';
import type { Property } from 'csstype';
import memberAtom from 'libs/recoil/member';
import { ChangeEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { Badge } from '@/app/_components/ui/Badge';
import { Button } from '@/app/_components/ui/Button';
import { Textarea } from '@/app/_components/ui/Textarea';
import Layout from '@/components/layout';

type FormProps = {
  reply: string;
};

type Props = {
  params: {
    id: number;
  };
};
const CommunityPostDetail = ({ params: { id } }: Props) => {
  const [textareaHeight, setTextareaHeight] = useState<Property.Height<string | number>>('auto');
  const { register, handleSubmit } = useForm<FormProps>();
  const { data } = useBoardQuery(id);
  const { mutate } = useReplyWrite(id);
  const { email } = useRecoilValue(memberAtom);

  const resize: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (textareaHeight !== e.target.scrollHeight) {
      e.target.style.height = 'auto';
    }
    setTextareaHeight(e.target.scrollHeight);
  };

  const handleReply: SubmitHandler<FormProps> = ({ reply }) => {
    mutate({ content: reply, email: email ?? '', boardId: id });
  };

  return (
    <Layout canGoBack>
      <div className="p-3">
        <h2 className="mb-4 text-4xl">{data?.title}</h2>
        <div className="mb-2 flex items-center space-x-3">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <p className="cursor-pointer text-sm font-medium">{data?.name}</p>
        </div>
        <div className="mb-8 flex">
          {data?.hashTags.map(({ tag }, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="mr-2 rounded-xl text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mb-24">{data?.content}</p>
        <div className="mb-2 text-lg">{data?.replyCount}개의 댓글</div>
        <form onSubmit={handleSubmit(handleReply)}>
          <Textarea
            {...register('reply')}
            className="mb-4 min-h-24 resize-none overflow-hidden"
            placeholder="지금 댓글을 달아보세요!"
            required
            onChange={resize}
            style={{ height: textareaHeight }}
            rows={1}
          />
          <div className="flex flex-row-reverse">
            <Button className="mb-10">댓글 작성</Button>
          </div>
        </form>
        {data?.replies &&
          data.replies.map(({ content, writer }, index) => {
            return (
              <div key={index} className="mb-3 flex space-x-3">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage />
                  <AvatarFallback />
                </Avatar>
                <div className="flex flex-col">
                  <span className="mb-2 w-fit cursor-pointer text-sm font-medium">{writer}</span>
                  <p className="whitespace-pre">{content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
