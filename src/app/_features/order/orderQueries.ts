import { UndefinedInitialDataOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { orderKeys, OrderListFilter } from '@/app/_features/order/orderQueryKeys';
import { Order } from '@/domain/order';
import useFetchWrapper, { List } from '@/libs/client/fetch-wrapper';

export const useInfiniteOrders = (filters: Partial<OrderListFilter> = {}) => {
  const { orderEmail, endDate, startDate, size, page } = filters;
  const { get } = useFetchWrapper();

  const today = dayjs().format('YYYYMMDD');
  const lastWeek = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery({
    queryKey: orderKeys.list({
      size: size ?? 6,
      page,
      orderEmail,
      startDate: startDate ?? lastWeek,
      endDate: endDate ?? today,
    }),
    queryFn: async ({ pageParam, queryKey }) => {
      const [, , { orderEmail, startDate, endDate }] = queryKey;
      const { data } = await get<List<Order>>({
        url: `/order/recruits`,
        params: {
          page: pageParam,
          orderEmail,
          startDate,
          endDate,
        },
      });
      return data;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) return lastPage.data.pageNo + 1;
    },
  });
};

export const useInfinitePurchaseRecruits = (params?: Partial<OrderListFilter>) => {
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
};
export const useRecruitQuery = (orderNo: string, options?: UndefinedInitialDataOptions) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: orderKeys.detail(orderNo),
    queryFn: () => get({ url: `/order/recruit/${orderNo}` }),
    select: (data) => data.data.data,
    ...options,
  });
};
