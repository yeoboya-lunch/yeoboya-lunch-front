import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { userKeys } from '@/app/_queries/user/userQueryKeys';
import { User } from '@/domain/user';
import useFetchWrapper from '@/libs/client/fetch-wrapper';

type Profile = {
  phoneNumber?: number;
  account?: boolean;
} & User;

export const useSettingMember = () => {
  const { get } = useFetchWrapper();
  const { data: session } = useSession();

  return useQuery({
    queryKey: userKeys.detail(session?.token.subject),
    queryFn: () => get<Profile>({ url: `/member/${session?.token.subject}` }),
    enabled: !!session?.token.subject,
    select: (data) => data.data.data,
  });
};

export const useInfiniteMemberList = (page = 0) => {
  const { get } = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery({
    queryKey: userKeys.list({ page, size }),
    queryFn: ({ pageParam }) => get({ url: '/member', params: { size: size, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
    },
  });
};
