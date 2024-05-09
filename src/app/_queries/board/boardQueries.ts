import { useQuery } from '@tanstack/react-query';
import { Board } from 'domain/board';

import { boardKeys } from '@/app/_queries/board/boardQueryKeys';
import { PaginationOptions } from '@/client/ApiClient';
import useFetchWrapper, { PaginationData } from '@/libs/client/fetch-wrapper';

export const useBoardListQuery = ({ page, size }: PaginationOptions) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: boardKeys.list({
      size: size ?? 10,
      page: page,
    }),
    queryFn: ({ queryKey: [, , { size, page }] }) => {
      return get<PaginationData<Board>>({ url: '/board', params: { size, page } });
    },
    select: (data) => data.data.data,
  });
};

export const useBoardQuery = (boardId: Board['boardId']) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: () => {
      return get<Board>({ url: `/board/${boardId}` });
    },
    select: (data) => data.data.data,
  });
};
