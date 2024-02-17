import { useInfiniteQuery } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

const shopKeys = {
  all: () => ['shop'],
  list: () => [...shopKeys.all(), 'list'],
  details: () => [...shopKeys.all(), 'detail'],
  detail: (shopId: string) => [...shopKeys.details(), shopId],
};

function useInfiniteShops(options?: {}): any {
  const { get } = useFetchWrapper();
  const size = 10;

  return useInfiniteQuery({
    queryKey: shopKeys.list(),
    queryFn: ({ pageParam }) =>
      get({ url: `/shop`, params: { size: size, page: pageParam, sort: 'id,desc' } }),
    initialPageParam: 1,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
    },
    ...options,
  });
}

export { useInfiniteShops };
