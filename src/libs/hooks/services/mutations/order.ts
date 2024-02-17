import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderKeys } from '@/libs/hooks/services/keys/order';
import { IRecruit, IRecruitJoin } from '@/types/order';
import { useRouter } from 'next/navigation';

function useOrderStartRecruit() {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruit) => post({ url: `/order/recruit`, data: value }),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}

function useOrderRecruitGroupJoin() {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruitJoin) => post({ url: `/order/recruit/group/join`, data: value }),
    onSuccess: () => {
      router.refresh();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}

function useOrderRecruitGroupExit() {
  const { axiosDelete } = useFetchWrapper();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (groupOrderId: number) =>
      axiosDelete({ url: `/order/recruit/group/join/${groupOrderId}` }),
    onSuccess: () => {
      router.refresh();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}

export { useOrderStartRecruit, useOrderRecruitGroupJoin, useOrderRecruitGroupExit };
