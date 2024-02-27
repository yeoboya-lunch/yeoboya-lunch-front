import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Recruit } from '@/domain/order';
import useFetchWrapper from '@/libs/client/fetch-wrapper';
import { orderKeys } from '@/libs/hooks/services/keys/order';

export function useOrderStartRecruit() {
  const { post } = useFetchWrapper();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: orderKeys.insert(),
    mutationFn: (value: Recruit) => post({ url: `/order/recruit`, data: value }),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: orderKeys.list() });
    },
  });
}
