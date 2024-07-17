import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import apiClient, { InfiniteScrollData } from 'client/apiClient';

import { userKeys } from '@/app/_queries/user/userQueryKeys';
import { User } from '@/domain/user';

type Profile = {
  phoneNumber?: number;
  account?: boolean;
} & User;

export const useSettingMember = () => {
  return useQuery({
    queryKey: userKeys.detail(session?.token?.subject),
    queryFn: () => apiClient.get<Profile>(`/member/${session?.token?.subject}/summary`),
    enabled: !!session?.token?.subject,
    select: (data) => data,
  });
};

export const useInfiniteMemberList = (page = 0) => {
  const size = 30;

  return useInfiniteQuery({
    queryKey: userKeys.list({ page, size }),
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({
        size: size.toString(),
        page: pageParam.toString(),
      });

      return apiClient.get<InfiniteScrollData<User>>('/member', { params });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNext) return lastPage.data.pagination.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.pagination.hasPrevious) return firstPage.data.pagination.pageNo - 1;
    },
  });
};
