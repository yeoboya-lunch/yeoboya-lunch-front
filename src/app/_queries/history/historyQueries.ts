import { useQuery } from '@tanstack/react-query';
import apiClient, { InfiniteScrollData } from 'client/apiClient';
import { Member } from 'domain/member';

import { historyKeys } from '@/app/_queries/history/historyQueryKeys';
import { RecruitResponse } from '@/app/_queries/order/orderQueries';
import { GroupOrder } from '@/domain/order';

export type HistoryJoinResponse = GroupOrder;

export const useHistoryJoinQuery = (loginId: Member['loginId']) => {
  return useQuery({
    queryKey: historyKeys.join(loginId),
    queryFn: () => {
      return apiClient.get<InfiniteScrollData<HistoryJoinResponse>>(
        `/order/recruit/histories/join/${loginId}`,
      );
    },
    select: (data) => data.data,
  });
};

export type HistoryRecruitResponse = RecruitResponse['order'];
export const useHistoryRecruitQuery = (loginId: Member['loginId']) => {
  return useQuery({
    queryKey: historyKeys.recruit(loginId),
    queryFn: () => {
      return apiClient.get<HistoryRecruitResponse[]>(`/order/recruit/histories/${loginId}`);
    },
    select: (data) => data.data,
  });
};
