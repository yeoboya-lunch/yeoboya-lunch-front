import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { orderKeys, OrderListFilter } from '@/app/_queries/order/orderQueryKeys';
import { Order } from '@/domain/order';
import { Shop, ShopItem } from '@/domain/shop';
import { User } from '@/domain/user';
import useFetchWrapper, { InfiniteScrollData } from '@/libs/client/fetch-wrapper';

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
      const { data } = await get<InfiniteScrollData<Order>>({
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

type RecruitResponse = {
  group: {
    groupOrderId: number;
    orderId: number;
    title: string;
    orderItem: {
      itemName: ShopItem['name'];
      orderPrice: ShopItem['price'];
      orderQuantity: number;
      totalPrice: number;
    }[];
    email: User['email'];
    name: User['name'];
    totalPrice: number;
  }[];
  order: {
    deliveryFee: 1500;
    memo: string;
    joinMember: {
      orderId: number;
      groupOrderId: number;
      title: string;
      email: string;
      name: string;
      orderItem: {
        itemName: string;
        orderPrice: number;
        orderQuantity: number;
        totalPrice: number;
      }[];
      totalPrice: number;
    }[];
  } & Pick<Order, 'orderStatus' | 'orderId' | 'lastOrderTime' | 'title' | 'orderId'>;
  orderMember: User;
  shop: Omit<Shop, 'image'>;
};

export const useRecruitQuery = (orderNo: string) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: orderKeys.detail(orderNo),
    queryFn: () => get<RecruitResponse>({ url: `/order/recruit/${orderNo}` }),
    select: (data) => {
      console.log(data);
      return data.data.data;
    },
  });
};
