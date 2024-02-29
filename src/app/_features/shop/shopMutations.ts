import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopKeys } from '@/app/_features/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';
import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const useShopRegister = () => {
  const { post } = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationFn: (value: Shop) => post({ url: `/shop/create`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.lists() });
    },
  });
};
