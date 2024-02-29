import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const boardKeys = {
  all: () => ['board'],
  list: (filter: { page: number; size: number }) => [...boardKeys.all(), 'list', filter],
  // ListFilteredByEmail: (email?: string) => [...boardKeys.list(), email],
  details: () => [...boardKeys.all(), 'detail'],
  detail: (boardId: string) => [...boardKeys.details(), boardId],
} as const;

export function useBoardQuery(boardId: string, options?: {}) {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: () => get({ url: `/board/${boardId}` }),
    select: (data) => data.data.data,
    ...options,
  });
}

export function useBoardListQuery(page: number) {
  const { get } = useFetchWrapper();
  const size = 10;

  return useSuspenseQuery({
    queryKey: boardKeys.list({ page, size }),
    queryFn: () => get({ url: '/board', params: { size, page } }),
    select: (data) => data.data.data,
    refetchOnMount: true,
  });
}
