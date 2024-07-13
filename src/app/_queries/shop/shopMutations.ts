import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopKeys } from '@/app/_queries/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';
import apiClient from '@/libs/client/fetch-wrapper';

export const useShopRegister = () => {
  const { post } = apiClient();
  const cache = useQueryClient();

  return useMutation({
    mutationFn: (value: Shop) => post({ url: `/shop/create`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.lists() });
    },
  });
};
