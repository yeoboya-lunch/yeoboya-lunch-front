import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { IRecruitJoin } from '@/domain/order';
import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { orderKeys } from '@/libs/hooks/services/keys/order';

function useOrderRecruitGroupJoin() {
  const { post } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruitJoin) => post({ url: `/order/recruit/group/join`, data: value }),
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
