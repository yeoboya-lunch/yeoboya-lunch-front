import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Shop } from '@/domain/shop';
import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { shopKeys } from '@/libs/hooks/services/keys/shop';

function useShopRegister(options?: {}): any {
  const { post } = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: shopKeys.insert(),
    mutationFn: (value: Shop) => post({ url: `/shop/create`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries({ queryKey: shopKeys.list() });
    },
  });
}

export { useShopRegister };
