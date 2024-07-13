import { useInfiniteQuery } from '@tanstack/react-query';

import { shopKeys, ShopListFilter } from '@/app/_queries/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';
import apiClient, { InfiniteScrollData } from '@/libs/client/fetch-wrapper';

export const useInfiniteShops = (filters: ShopListFilter = {}) => {
  const { size, page, sort } = filters;
  const { get } = apiClient();

  return useInfiniteQuery({
    queryKey: shopKeys.list({
      size: size ?? 10,
      page: page ?? 1,
      sort: sort ?? 'id,desc',
    }),
    queryFn: async ({ pageParam, queryKey }) => {
      const [, , { size, sort }] = queryKey;
      const { data } = await get<InfiniteScrollData<Shop>>({
        url: `/shop`,
        params: { size: size, page: pageParam, sort },
      });
      return data;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNext) return lastPage.data.pagination.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.pagination.hasPrevious) return firstPage.data.pagination.pageNo - 1;
    },
  });
};
