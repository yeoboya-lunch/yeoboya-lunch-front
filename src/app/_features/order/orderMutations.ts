import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { orderKeys } from '@/app/_features/order/orderQueryKeys';
import { Order, Recruit } from '@/domain/order';
import { User } from '@/domain/user';
import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const useOrderStartRecruit = () => {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: Recruit) => post({ url: `/order/recruit`, data: value }),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
};
export const useOrderRecruitGroupExit = () => {
  const { axiosDelete } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (groupOrderId: number) =>
      axiosDelete({ url: `/order/recruit/group/join/${groupOrderId}` }),
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
    mutationKey: orderKeys.insert(),
    mutationFn: (value: RecruitJoinResponse) =>
      post({ url: `/order/recruit/group/join`, data: value }),
    onSuccess: () => {
      router.refresh();
    },
  });
};
