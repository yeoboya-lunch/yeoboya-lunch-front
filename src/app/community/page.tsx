'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import { useBoardListQuery } from '@libs/hooks/services/queries/board';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChatBubbleIcon, CheckCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';

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

      <div className="space-y-4 divide-y-[2px]">
        {data.list.map((content: IBoardContent, index: number) => (
          <Link
            key={index}
            href={`/community/${content.boardId}`}
            className="flex cursor-pointer flex-col items-start pt-4"
          >
            <div className="flex">
              {content.hashTags.map((hashTag: IHashTag, index: number) => {
                return (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800 first:ml-4"
                  >
                    {hashTag.tag}
                  </span>
                );
              })}
            </div>

            <div className="mt-2 px-4 text-gray-700">
              <span className="font-medium text-orange-500">Q.</span> {content.title}
            </div>
            <div className="mt-5 flex w-full items-center justify-between px-4 text-xs font-medium text-gray-500">
              <span>{content.name}</span>
              <span>{content.createDate}</span>
            </div>
            <div className="mt-3 flex w-full space-x-5 border-t px-4 py-2.5   text-gray-700">
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
        ))}

        {!data.pagination.isEmpty && (
          <ReactPaginate
            breakLabel=""
            marginPagesDisplayed={0}
            previousLabel="<"
            nextLabel=">"
            onPageChange={handlePageClick}
            onPageActive={handlePageActive}
            renderOnZeroPageCount={undefined}
            pageRangeDisplayed={data.list.length}
            pageCount={data.pagination.totalPages}
            containerClassName={'flex justify-center items-center -space-x-px pt-10'}
            previousClassName={
              'block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }
            pageClassName={''}
            pageLinkClassName={
              'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }
            activeClassName={''}
            activeLinkClassName={
              'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
            }
            nextClassName={
              'block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }
          />
        )}

        <FloatingButton href="/community/write">
          <Pencil1Icon className="h-6 w-6" />
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
