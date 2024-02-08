'use client';

import { InfiniteData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import useFetchWrapper from '@libs/client/fetch-wrapper';
import { orderKeys } from '@libs/hooks/services/keys/order';
import dayjs from 'dayjs';

interface IOrderSearch {
  orderEmail?: string;
  startDate?: string;
  endDate?: string;
}
function useInfiniteOrders(params?: IOrderSearch, options?: {}): any {
  const { get } = useFetchWrapper();
  const size = 6;
  let today = dayjs().format('YYYYMMDD');
  let startDay = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery(
    orderKeys.ListFilteredByEmail(params?.orderEmail),
    ({ pageParam = 1 }) =>
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
    {
      ...options,
      refetchOnMount: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
      onSuccess: (result: InfiniteData<any>) => {
        // console.log('==== Request 리스트 조회 성공 ====');
        // console.log(result);
      },
    },
  );
}

function useInfinitePurchaseRecruits(params?: IOrderSearch, options?: {}): any {
  const { get } = useFetchWrapper();
  const queryClient = useQueryClient();
  const size = 30;
  let today = dayjs().format('YYYYMMDD');
  let startDay = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery(
    orderKeys.list(),
    ({ pageParam = 1 }) =>
      get({
        url: `/order/purchase-recruits`,
        params: {
          size: size,
          page: pageParam,
          orderEmail: params?.orderEmail,
        },
      }),
    {
      ...options,
      // cacheTime: 1,
      refetchOnMount: 'always',
      refetchOnReconnect: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
      onSuccess: (result: InfiniteData<any>) => {
        // console.log('==== Request 리스트 조회 성공 ====');
        // console.log(result);
      },
    },
  );
}

function useRecruitQuery(orderNo: string, options?: {}): any {
  const { get } = useFetchWrapper();

  return useQuery(orderKeys.detail(orderNo), () => get({ url: `/order/recruit/${orderNo}` }), {
    ...options,
    select: (data) => data.data.data,
    onSuccess: (data) => {},
  });
}

export { useInfiniteOrders, useRecruitQuery, useInfinitePurchaseRecruits };
