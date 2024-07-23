import { useInfiniteQuery } from '@tanstack/react-query';
import apiClient, { InfiniteScrollData } from 'client/apiClient';

import { shopKeys, ShopListFilter } from '@/app/_queries/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';

export const useInfiniteShops = (filters?: ShopListFilter) => {
  const { size, page, sort } = Object.assign({ size: 10, page: 1, sort: 'id,desc' }, filters);

  return useInfiniteQuery({
    queryKey: shopKeys.list({ size, page, sort }),
    queryFn: async ({ pageParam, queryKey }) => {
      const [, , { size, sort }] = queryKey;
      const params = new URLSearchParams({
        size: size.toString(),
        page: pageParam.toString(),
        sort,
      });
      const { data } = await apiClient.get<InfiniteScrollData<Shop>>(`/shop`, { params });
      return data;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) return lastPage.pagination.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.pagination.hasPrevious) return firstPage.pagination.pageNo - 1;
    },
  });
};
