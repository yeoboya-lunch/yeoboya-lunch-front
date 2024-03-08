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
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};
export const useEndOrderRecruit = () => {
  const { patch } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationFn: (groupOrderId: number) =>
      patch({ url: `/order/recruit/group/join/${groupOrderId}`, data: { status: 'END' } }),
    onSuccess: () => {
      router.refresh();
    },
  });
};
export type RecruitJoinResponse = {
  orderNo: string;
  email: User['name'];
  orderItems: Order[];
};
export const useOrderRecruitGroupJoin = () => {
  const { post } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationFn: (value: RecruitJoinResponse) =>
      post({ url: `/order/recruit/group/join`, data: value }),
    onSuccess: () => {
      router.refresh();
    },
  });
};
