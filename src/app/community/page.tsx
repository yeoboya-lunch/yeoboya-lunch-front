'use client';

import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import { useBoardList } from '@libs/hooks/services/queries/board';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Community: NextPage = () => {
  const [page, setPage] = useState(0);
  const { data: data, refetch } = useBoardList(page);
  console.log(data.list);

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
        <div className="border border-dotted flex flex-col items-center p-10 mt-5">
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
            className="flex cursor-pointer flex-col pt-4 items-start"
          >
            <div className="flex">
              {content.hashTags.map((hashTag: IHashTag, index: number) => {
                return (
                  <span
                    key={index}
                    className="first:ml-4 px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {hashTag.tag}
                  </span>
                );
              })}
            </div>

            <div className="mt-2 px-4 text-gray-700">
              <span className="text-orange-500 font-medium">Q.</span> {content.title}
            </div>
            <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
              <span>{content.name}</span>
              <span>{content.createDate}</span>
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t   w-full">
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>공감 1</span>
              </span>
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
