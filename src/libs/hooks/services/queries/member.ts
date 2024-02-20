'use client';

import { useSession } from 'next-auth/react';
import { QueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

type Props = QueryOptions;

const memberKeys = {
  all: () => ['member'],
  list: () => [...memberKeys.all(), 'list'],
  details: () => [...memberKeys.all(), 'detail'],
  detail: (email: string | undefined) => [...memberKeys.details(), email],
};

function useSettingMember(options: Props) {
  const { get } = useFetchWrapper();
  const { data: session } = useSession();

  return useQuery({
    queryKey: memberKeys.detail(session?.token.subject),
    queryFn: () => get({ url: `/member/${session?.token.subject}` }),
    enabled: !!session?.token.subject,
    refetchOnMount: true,
    select: (data) => data.data,
    ...options,
  });
}

function useInfiniteMemberList() {
  const { get } = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery({
    queryKey: memberKeys.list(),
    queryFn: ({ pageParam }) => get({ url: '/member', params: { size: size, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
    },
  });
}

export { useSettingMember, useInfiniteMemberList };
