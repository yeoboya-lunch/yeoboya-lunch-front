import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {orderKeys} from '@libs/hooks/services/keys/order';

interface Recruit {
  email: string;
  shopName: string;
  title: string;
  deliveryFee: number;
  lastOrderTime: string;
  memo: string;
}

function useOrderStartRecruit(): any {
  const {post} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: Recruit) => post({url: `/order/recruit`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {
      return cache.invalidateQueries(orderKeys.list());
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export {useOrderStartRecruit};