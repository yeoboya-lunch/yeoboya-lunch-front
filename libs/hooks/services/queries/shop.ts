import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';

const shopKeys = {
  all: () => ['shop'],
  list: () => [...shopKeys.all(), 'list'],
  details: () => [...shopKeys.all(), 'detail'],
  detail: (shopId: string) => [...shopKeys.details(), shopId],
};

function useInfiniteShops(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery(
    [shopKeys.all()],
    ({pageParam = 1}) => get({url: `/shop`, params: {size: size, page: pageParam}}),
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
    },
  );
}

export {useInfiniteShops};
