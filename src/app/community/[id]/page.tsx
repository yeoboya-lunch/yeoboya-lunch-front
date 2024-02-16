'use client';

import type { NextPage } from 'next';
import { ChangeEventHandler, useState } from 'react';
import Layout from '@/components/layout';
import { Badge } from '@/app/_components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/ui/Avatar';
import { Textarea } from '@/app/_components/ui/Textarea';
import { Button } from '@/app/_components/ui/Button';
import type { Property } from 'csstype';

const tagList = ['1234', '하이루', 'Hello'];

const CommunityPostDetail: NextPage = () => {
  const [textareaHeight, setTextareaHeight] = useState<Property.Height<string | number>>('auto');

  const resize: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (textareaHeight !== e.target.scrollHeight) {
      e.target.style.height = 'auto';
    }
    setTextareaHeight(e.target.scrollHeight);
  };

  return (
    <Layout canGoBack>
      <div className="p-3">
        <h2 className="mb-4 text-4xl">제목</h2>
        <div className="mb-2 flex items-center space-x-3">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <p className="cursor-pointer text-sm font-medium">작성자</p>
        </div>
        <div className="mb-8 flex">
          {tagList.map((tag, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="mr-2 rounded-xl text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mb-24">Sunt eraes resuscitabo nobilis, neuter boreases.</p>
        <div className="mb-2 text-lg">0개의 댓글</div>
        <Textarea
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
        <div className="mb-3 flex space-x-3">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col">
            <span className="mb-2 w-fit cursor-pointer text-sm font-medium">작성자</span>
            <p>
              Adiurators volare!Adiurators volare!Adiurators volare!Adiurators volare!Adiurators
              volare!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
