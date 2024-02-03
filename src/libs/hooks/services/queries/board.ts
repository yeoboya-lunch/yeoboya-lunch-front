import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {boardKeys} from '@libs/hooks/services/keys/board';
import {orderKeys} from '@libs/hooks/services/keys/order';

function useBoardQuery(boardId: string, options?: {}): any {
  const {get} = useFetchWrapper();

  return useQuery(boardKeys.detail(boardId), () => get({url: `/board/${boardId}`}), {
    ...options,
    select: (data) => data.data.data,
    onSuccess: (data) => {},
  });
}

function useBoardList(page: number, options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 10;

  return useQuery(boardKeys.list(), () => get({url: '/board', params: {size: size, page: page}}), {
    refetchOnMount: true,
    select: (data) => data.data.data,
    onSuccess: (data) => {},
  });
}

export {useBoardList, useBoardQuery};
