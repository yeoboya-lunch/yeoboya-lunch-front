import useFetchWrapper from '@libs/client/fetch-wrapper';
import { useQuery } from '@tanstack/react-query';

const boardKeys = {
  all: () => ['board'],
  list: () => [...boardKeys.all(), 'list'],
  ListFilteredByEmail: (email?: string) => [...boardKeys.list(), email],
  details: () => [...boardKeys.all(), 'detail'],
  detail: (boardId: string) => [...boardKeys.details(), boardId],
} as const;

function useBoardQuery(boardId: string, options?: {}) {
  const { get } = useFetchWrapper();

  return useQuery(boardKeys.detail(boardId), () => get({ url: `/board/${boardId}` }), {
    ...options,
    select: (data) => data.data.data,
  });
}

function useBoardListQuery(page: number) {
  const { get } = useFetchWrapper();
  const size = 10;

  return useQuery(boardKeys.list(), () => get({ url: '/board', params: { size, page } }), {
    refetchOnMount: true,
    select: (data) => data.data.data,
  });
}

export { boardKeys, useBoardListQuery, useBoardQuery };
