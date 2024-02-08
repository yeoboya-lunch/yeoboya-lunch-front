import useFetchWrapper from '@libs/client/fetch-wrapper';
import { useQuery } from '@tanstack/react-query';
import boardKeys from '@libs/hooks/services/keys/board';

function useBoardQuery(boardId: string, options?: {}): any {
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

export { useBoardListQuery, useBoardQuery };
