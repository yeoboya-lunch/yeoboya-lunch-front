import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from 'client/apiClient';

import { shopKeys } from '@/app/_queries/shop/shopQueryKeys';
import { Shop } from '@/domain/shop';

export const useShopRegister = () => {
  const cache = useQueryClient();

  return useMutation({
    mutationFn: (data: Shop) => apiClient.post(`/shop/create`, { data }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.lists() });
    },
  });
};
