'use client';

import { InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { orderKeys } from '@/libs/hooks/services/keys/order';

interface IOrderSearch {
  orderEmail?: string;
  startDate?: string;
  endDate?: string;
}
function useInfiniteOrders(params?: IOrderSearch, options?: {}): any {
  const { get } = useFetchWrapper();
  const size = 6;
  const today = dayjs().format('YYYYMMDD');
  const startDay = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery({
    queryKey: orderKeys.ListFilteredByEmail(params?.orderEmail),
    queryFn: ({ pageParam }) =>
      get({
        url: `/order/recruits`,
        params: {
          size: size,
          page: pageParam,
          orderEmail: params?.orderEmail,
          // orderStatus:
          startDate: startDay,
          endDate: today,
        },
      }),
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

function useInfinitePurchaseRecruits(params?: IOrderSearch, options?: {}): any {
  const { get } = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery({
    queryKey: orderKeys.list(),
    queryFn: ({ pageParam }) =>
      get({
        url: `/order/purchase-recruits`,
        params: {
          size: size,
          page: pageParam,
          orderEmail: params?.orderEmail,
        },
      }),
    initialPageParam: 1,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
    },
    ...options,
  });
}

function useRecruitQuery(orderNo: string, options?: {}): any {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: orderKeys.detail(orderNo),
    queryFn: () => get({ url: `/order/recruit/${orderNo}` }),
    select: (data) => data.data.data,
    ...options,
  });
}

export { useInfiniteOrders, useRecruitQuery, useInfinitePurchaseRecruits };
