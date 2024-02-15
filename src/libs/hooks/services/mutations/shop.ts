import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shopKeys } from '@/libs/hooks/services/keys/shop';
import { IShop } from '../../../../types/shop';

function useShopRegister(options?: {}): any {
  const { post } = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: shopKeys.insert(),
    mutationFn: (value: IShop) => post({ url: `/shop/create`, data: value }),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      console.log('지웁니다');
      return cache.invalidateQueries({ queryKey: shopKeys.list() });
    },
    onError: (error, variables, context) => {},
  });
}

export { useShopRegister };
