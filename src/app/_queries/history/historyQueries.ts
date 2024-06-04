import { useQuery } from '@tanstack/react-query';

import { historyKeys } from '@/app/_queries/history/historyQueryKeys';
import { GroupOrder } from '@/domain/order';
import { User } from '@/domain/user';
import useFetchWrapper, { InfiniteScrollData } from '@/libs/client/fetch-wrapper';

export type HistoryJoinResponse = GroupOrder;

export const useHistoryJoinQuery = (email: User['email']) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: historyKeys.join(email),
    queryFn: () => {
      return get<InfiniteScrollData<HistoryJoinResponse>>({
        url: `/order/recruit/histories/join/${email}`,
      });
    },
    select: (data) => data.data.data,
  });
};

export const useHistoryRecruitQuery = (email: User['email']) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: historyKeys.recruit(email),
    queryFn: () => {
      return get({ url: `/order/recruit/histories/${email}` });
    },
  });
};
