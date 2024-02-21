'use client';

import { UndefinedInitialDataOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { orderKeys } from '@/libs/hooks/services/keys/order';

interface IOrderSearch {
  orderEmail?: string;
  startDate?: string;
  endDate?: string;
  page: number;
}
function useInfiniteOrders(params?: IOrderSearch) {
  const { get } = useFetchWrapper();
  const defaultKey: Parameters<typeof orderKeys.list>[0] = {
    size: 6,
    page: 1,
  };
  const queryKey = Object.assign(
    defaultKey,
    params?.orderEmail ? { email: params?.orderEmail } : {},
  );
  const today = dayjs().format('YYYYMMDD');
  const startDay = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery({
    queryKey: orderKeys.list({
      size: queryKey.size,
      page: 1,
    }),
    queryFn: ({ pageParam }) =>
      get({
        url: `/order/recruits`,
        params: {
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
  });
}

function useInfinitePurchaseRecruits(params?: IOrderSearch) {
  const { get } = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery({
    queryKey: orderKeys.list({
      size,
      page: 1,
    }),
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
  });
}

function useRecruitQuery(orderNo: string, options?: UndefinedInitialDataOptions) {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: orderKeys.detail(orderNo),
    queryFn: () => get({ url: `/order/recruit/${orderNo}` }),
    select: (data) => data.data.data,
    ...options,
  });
}

export { useInfiniteOrders, useRecruitQuery, useInfinitePurchaseRecruits };
