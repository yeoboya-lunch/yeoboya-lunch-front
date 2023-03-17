import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {boardKeys} from '@libs/hooks/services/keys/board';

function useInfiniteBoardList(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 10;

  return useInfiniteQuery(
    boardKeys.list(),
    ({pageParam = 1}) => get({url: '/board', params: {size: size, page: pageParam}}),
    {
      ...options,
      getNextPageParam: (lastPage) => {
        // if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        // if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
    },
  );
}

export {useInfiniteBoardList};
