'use client';

import { ChatBubbleIcon, HeartFilledIcon, HeartIcon, Pencil1Icon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Badge } from '@/app/_components/ui/Badge';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/app/_components/ui/Pagination';
import { useBoardListQuery } from '@/app/_queries/board/boardQueries';
import FloatingButton from '@/components/floating-button';
import Layout from '@/components/layout';

const BoardPage: NextPage = () => {
  const { data } = useBoardListQuery({ page: 0 });

  if (!data) {
    return null;
  }

  const { pagination, list } = data;

  return (
    <Layout hasTabBar title="자유게시판" className="p-0">
      {pagination.isEmpty && (
        <div className="mt-5 flex flex-col items-center border border-dotted p-10">
          <div>사진</div>
          <Link href="/board/write" scroll={false}>
            <div>Create a New Board</div>
          </Link>
        </div>
      )}

      <div className="divide-y-[2px]">
        {list?.map((content) => {
          const { boardId, title, name, createDate, likeCount, replyCount, clickLiked } = content;
          return (
            <Link
              key={boardId}
              href={`/board/${boardId}`}
              className="flex cursor-pointer flex-col items-start p-4"
              scroll={false}
            >
              <div className="mt-2 flex">
                {content.hashTag.map(({ tag }, index) => {
                  return (
                    <Badge
                      variant="secondary"
                      key={index}
                      className="mr-1 rounded-lg px-1.5 py-0.5 text-xs"
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </div>

              <div className="mt-2">{title}</div>
              <div className="mt-5 flex w-full items-center justify-between text-xs font-medium">
                <span>{name}</span>
                <span className="text-muted-foreground">{createDate}</span>
              </div>
              <div className="mt-3 flex w-full justify-end space-x-5 text-base">
                <span className="flex items-center gap-2">
                  {clickLiked ? (
                    <HeartFilledIcon className="h-4 w-4 text-accent" />
                  ) : (
                    <HeartIcon className="h-4 w-4" />
                  )}
                  <span>{likeCount}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <ChatBubbleIcon className="h-4 w-4" />
                  <span>{replyCount}</span>
                </span>
              </div>
            </Link>
          );
        })}

        {!data?.pagination?.isEmpty && (
          <Pagination className="pt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <FloatingButton href="/board/write">
        <Pencil1Icon className="h-6 w-6" />
      </FloatingButton>
    </Layout>
  );
};

export default BoardPage;
