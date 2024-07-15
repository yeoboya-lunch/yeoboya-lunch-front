import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { orderKeys, OrderListFilter } from '@/app/_queries/order/orderQueryKeys';
import { GroupOrder, Order, UserOrder } from '@/domain/order';
import { Shop } from '@/domain/shop';
import { User } from '@/domain/user';
import apiClient, { InfiniteScrollData } from '@/libs/client/apiClient';

export const useInfiniteOrders = (filters: Partial<OrderListFilter> = {}) => {
  const { orderEmail, endDate, startDate, size, page } = filters;

  const today = dayjs().format('YYYYMMDD');
  const lastWeek = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery({
    queryKey: orderKeys.list({
      size: size ?? 6,
      page: page ?? 1,
      orderEmail: orderEmail ?? '',
      startDate: startDate ?? lastWeek,
      endDate: endDate ?? today,
    }),
    queryFn: async ({ pageParam, queryKey }) => {
      const [, , { orderEmail, startDate, endDate }] = queryKey;
      const params = new URLSearchParams({
        page: pageParam.toString(),
        orderEmail,
        startDate,
        endDate,
      });
      const { data } = await apiClient.get<InfiniteScrollData<Order>>({
        url: `/order/recruits`,
        params,
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) return lastPage.pagination.pageNo + 1;
    },
  });
};

export type RecruitResponse = {
  group: GroupOrder[];
  order: {
    deliveryFee: number;
    memo: string;
    joinMember: UserOrder[];
  } & Pick<Order, 'orderStatus' | 'orderId' | 'lastOrderTime' | 'title'>;
  orderMember: User;
  shop: Shop;
};

export const useRecruitQuery = (orderNo: string) => {
  return useQuery({
    queryKey: orderKeys.detail(orderNo),
    queryFn: () => apiClient.get<RecruitResponse>({ url: `/order/recruit/${orderNo}` }),
    select: (data) => data.data,
  });
};
