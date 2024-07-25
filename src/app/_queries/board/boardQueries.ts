import { useQuery } from '@tanstack/react-query';
import apiClient, { PaginationData, PaginationOptions } from 'client/apiClient';
import { Board } from 'domain/board';

import { boardKeys } from '@/app/_queries/board/boardQueryKeys';

export const useBoardListQuery = (pageParams: PaginationOptions) => {
  const { page, size } = Object.assign({ page: 1, size: 10 }, pageParams);
  return useQuery({
    queryKey: boardKeys.list({
      size,
      page,
    }),
    queryFn: ({ queryKey: [, , { size, page }] }) => {
      const params = new URLSearchParams({
        size: size.toString(),
        page: page.toString(),
      });

      return apiClient.get<PaginationData<Board>>('/board', { params });
    },
    select: (data) => data.data,
  });
};

export const useBoardQuery = (boardId: Board['boardId']) => {
  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: () => apiClient.get<Board>(`/board/${boardId}`),
    select: (data) => {
      return data?.data;
    },
  });
};
