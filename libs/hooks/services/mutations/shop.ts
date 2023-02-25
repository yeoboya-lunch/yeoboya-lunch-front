import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {shopKeys} from '@libs/hooks/services/keys/shop';
import {IShop} from '../../../../types/shop';

function useShopRegister(): any {
  const {post} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: shopKeys.insert(),
    mutationFn: (value: IShop) => post({url: `/shop`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {
      return cache.invalidateQueries(shopKeys.list());
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export {useShopRegister};