'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import React, { useEffect, useState } from 'react';
import { ChatBubbleIcon, CheckCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useBoardListQuery } from '@app/community/queries';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@app/_components/ui/Pagination';

const Community: NextPage = () => {
  const [page, setPage] = useState(0);
  const { data, refetch } = useBoardListQuery(page);

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  const handlePageActive = () => {
    console.log('활성이벤트');
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <Layout hasTabBar title="자유게시판">
      {data.pagination.isEmpty && (
        <div className="mt-5 flex flex-col items-center border border-dotted p-10">
          <div>사진</div>
          <Link href="/community/write">
            <div>Create a New Board</div>
          </Link>
        </div>
      )}

      <div className="divide-y-[2px]">
        {data.list.map((content: IBoardContent) => {
          const { boardId, title, name, createDate } = content;
          return (
            <Link
              key={boardId}
              href={`/community/${boardId}`}
              className="flex cursor-pointer flex-col items-start p-4"
            >
              <div className="mt-2 flex">
                {content.hashTags.map((hashTag: IHashTag, index) => {
                  const { tag } = hashTag;
                  return (
                    <span
                      key={index}
                      className="mr-1 rounded-lg bg-secondary px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  );
                })}
                <img src="" alt="" />
              </div>

              <div className="mt-2">{title}</div>
              <div className="mt-5 flex w-full items-center justify-between text-xs font-medium">
                <span>{name}</span>
                <span className="text-muted-foreground">{createDate}</span>
              </div>
              <div className="mt-3 flex w-full justify-end space-x-5">
                <span className="flex items-center space-x-2 text-sm">
                  <CheckCircledIcon className="h-4 w-4" />
                  <span>공감 1</span>
                </span>
                <span className="flex items-center space-x-2 text-sm">
                  <ChatBubbleIcon className="h-4 w-4" />
                  <span>답변 1</span>
                </span>
              </div>
            </Link>
          );
        })}

        {!data.pagination.isEmpty && (
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

        <FloatingButton href="/community/write">
          <Pencil1Icon className="h-6 w-6" />
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
