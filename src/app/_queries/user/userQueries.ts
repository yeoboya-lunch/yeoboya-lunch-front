import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { userKeys } from '@/app/_queries/user/userQueryKeys';
import { User } from '@/domain/user';
import apiClient, { InfiniteScrollData } from '@/libs/client/apiClient';

type Profile = {
  phoneNumber?: number;
  account?: boolean;
} & User;

export const useSettingMember = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: userKeys.detail(session?.token.subject),
    queryFn: () => apiClient.get<Profile>({ url: `/member/${session?.token.subject}/summary` }),
    enabled: !!session?.token.subject,
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

      return apiClient.get<InfiniteScrollData<User>>({
        url: '/member',
        params,
      });
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
