import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { userKeys } from '@/app/_queries/user/userQueryKeys';
import { User } from '@/domain/user';
import useFetchWrapper, { InfiniteScrollData } from '@/libs/client/fetch-wrapper';

type Profile = {
  phoneNumber?: number;
  account?: boolean;
} & User;

export const useSettingMember = () => {
  const { get } = useFetchWrapper();
  const { data: session } = useSession();

  return useQuery({
    queryKey: userKeys.detail(session?.token.subject),
    queryFn: () => get<Profile>({ url: `/member/${session?.token.subject}/summary` }),
    enabled: !!session?.token.subject,
    select: (data) => data.data.data,
  });
};

export const useInfiniteMemberList = (page = 0) => {
  const { get } = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery({
    queryKey: userKeys.list({ page, size }),
    queryFn: ({ pageParam }) =>
      get<InfiniteScrollData<User>>({ url: '/member', params: { size: size, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.pagination.hasNext) return lastPage.data.data.pagination.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.data.pagination.hasPrevious)
        return firstPage.data.data.pagination.pageNo - 1;
    },
  });
};
