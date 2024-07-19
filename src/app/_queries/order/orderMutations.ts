import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from 'client/apiClient';
import { Member } from 'domain/member';
import { useRouter } from 'next/navigation';

import { orderKeys } from '@/app/_queries/order/orderQueryKeys';
import { Order, Recruit } from '@/domain/order';

export const useStartOrderRecruit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Recruit) => apiClient.post(`/order/recruit/start`, { data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: orderKeys.lists() }),
  });
};
export const useEndOrderRecruit = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (groupOrderId: string) =>
      apiClient.patch(`/order/recruit/${groupOrderId}`, { data: { status: 'END' } }),
    onSuccess: () => {
      router.replace('/');
    },
  });
};
export type RecruitJoinPostBody = {
  orderId: string;
  email: Member['name'];
  orderItems: Cart[];
};
export type RecruitJoinPatchBody = {
  orderId: string;
  groupOrderId: number;
  orderItems: Cart[];
};
export type Cart = { itemName: string; orderQuantity: number };
export const useOrderRecruitGroupJoin = <T = boolean>(hasData?: T) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: T extends true ? RecruitJoinPatchBody : RecruitJoinPostBody) => {
      if (hasData) {
        return apiClient.patch(`/order/recruit/join`, { data: value });
      }
      return apiClient.post(`/order/recruit/join`, { data: value });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.orderId) });
      router.replace(`/order/${variables.orderId}`);
    },
  });
};

export const useOrderRecruitCancel = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: Order['orderId'] | string) =>
      apiClient.delete(`/order/recruit/join/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      router.replace('/');
    },
  });
};
