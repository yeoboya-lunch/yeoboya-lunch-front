import { useMutation, useQueryClient } from '@tanstack/react-query';

import { shopKeys } from '@/app/_queries/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';
import apiClient from '@/libs/client/apiClient';

export const useShopRegister = () => {
  const cache = useQueryClient();

  return useMutation({
    mutationFn: (value: Shop) => apiClient.post({ url: `/shop/create`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.lists() });
    },
  });
};
