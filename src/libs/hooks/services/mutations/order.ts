import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Order } from '@/domain/order';
import { User } from '@/domain/user';
import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { orderKeys } from '@/libs/hooks/services/keys/order';

export type RecruitJoinResponse = {
  orderNo: string;
  email: User['name'];
  orderItems: Order[];
};

function useOrderRecruitGroupJoin() {
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
}

function useOrderRecruitGroupExit() {
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
}

export { useOrderRecruitGroupJoin, useOrderRecruitGroupExit };
