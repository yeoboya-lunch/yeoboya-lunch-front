import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { orderKeys } from '@/app/_queries/order/orderQueryKeys';
import { Order, Recruit } from '@/domain/order';
import { User } from '@/domain/user';
import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const useStartOrderRecruit = () => {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: Recruit) => post({ url: `/order/recruit/start`, data: value }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.lists() }),
  });
};
export const useEndOrderRecruit = () => {
  const { patch } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationFn: (groupOrderId: string) =>
      patch({ url: `/order/recruit/${groupOrderId}`, data: { status: 'END' } }),
    onSuccess: () => {
      router.replace('/');
    },
  });
};
export type RecruitJoinPostBody = {
  orderId: string;
  email: User['name'];
  orderItems: Cart[];
};
export type RecruitJoinPatchBody = {
  orderId: string;
  groupOrderId: number;
  orderItems: Cart[];
};
export type Cart = { itemName: string; orderQuantity: number };
export const useOrderRecruitGroupJoin = <T = boolean>(hasData?: T) => {
  const { post, patch } = useFetchWrapper();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: T extends true ? RecruitJoinPatchBody : RecruitJoinPostBody) => {
      if (hasData) {
        return patch({ url: `/order/recruit/join`, data: value });
      }
      return post({ url: `/order/recruit/join`, data: value });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.orderId) });
      router.replace(`/order/${variables.orderId}`);
    },
  });
};

export const useOrderRecruitCancel = () => {
  const { axiosDelete } = useFetchWrapper();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: Order['orderId'] | string) =>
      axiosDelete({ url: `/order/recruit/join/${orderId}` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      router.replace('/');
    },
  });
};
