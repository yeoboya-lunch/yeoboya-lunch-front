import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {boardKeys} from '@libs/hooks/services/keys/board';

function useBoardList(page: number, options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 10;

  return useQuery(boardKeys.list(), () => get({url: '/board', params: {size: size, page: page}}), {
    refetchOnMount: true,
    select: (data) => data.data.data,
    onSuccess: (data) => {},
  });
}

export {useBoardList};
