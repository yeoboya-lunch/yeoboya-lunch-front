import { useQuery } from '@tanstack/react-query';

import { historyKeys } from '@/app/_queries/history/historyQueryKeys';
import { RecruitResponse } from '@/app/_queries/order/orderQueries';
import { GroupOrder } from '@/domain/order';
import { User } from '@/domain/user';
import apiClient, { InfiniteScrollData } from '@/libs/client/apiClient';

export type HistoryJoinResponse = GroupOrder;

export const useHistoryJoinQuery = (email: User['email']) => {
  return useQuery({
    queryKey: historyKeys.join(email),
    queryFn: () => {
      return apiClient.get<InfiniteScrollData<HistoryJoinResponse>>({
        url: `/order/recruit/histories/join/${email}`,
      });
    },
    select: (data) => data.data,
  });
};

export type HistoryRecruitResponse = RecruitResponse['order'];
export const useHistoryRecruitQuery = (email: User['email']) => {
  return useQuery({
    queryKey: historyKeys.recruit(email),
    queryFn: () => {
      return apiClient.get<HistoryRecruitResponse[]>({ url: `/order/recruit/histories/${email}` });
    },
    select: (data) => data.data,
  });
};
