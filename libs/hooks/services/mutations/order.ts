import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {orderKeys} from '@libs/hooks/services/keys/order';
import {IItem, IRecruit, IRecruitJoin} from '../../../../types/order';

function useOrderStartRecruit(): any {
  const {post} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruit) => post({url: `/order/recruit`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      return cache.invalidateQueries(orderKeys.list());
    },
    onError: (error, variables, context) => {},
  });
}

function useOrderRecruitGroupJoin(): any {
  const {post} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruitJoin) => post({url: `/order/recruit/group/join`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      return cache.invalidateQueries(orderKeys.list());
    },
    onError: (error, variables, context) => {},
  });
}

function useOrderRecruitGroupExit(): any {
  const {axiosDelete} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (groupOrderId: number) =>
      axiosDelete({url: `/order/recruit/group/join/${groupOrderId}`}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      return cache.invalidateQueries(orderKeys.list());
    },
    onError: (error, variables, context) => {},
  });
}

function useSetOrderStatus(): any {
  const {patch} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: IRecruitJoin) => patch({url: `/order/${orderId}`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      return cache.invalidateQueries(orderKeys.list());
    },
    onError: (error, variables, context) => {},
  });
}

export {
  useOrderStartRecruit,
  useOrderRecruitGroupJoin,
  useOrderRecruitGroupExit,
  useSetOrderStatus,
};
