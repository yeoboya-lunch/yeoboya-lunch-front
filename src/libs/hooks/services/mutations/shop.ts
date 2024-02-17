import { useMutation, useQueryClient } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { shopKeys } from '@/libs/hooks/services/keys/shop';

import { IShop } from '../../../../types/shop';

function useShopRegister(options?: {}): any {
  const { post } = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: shopKeys.insert(),
    mutationFn: (value: IShop) => post({ url: `/shop/create`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.list() });
    },
  });
}

export { useShopRegister };
