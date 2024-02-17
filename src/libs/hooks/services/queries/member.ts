'use client';

import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import memberAtom from '@/libs/recoil/member';

const memberKeys = {
  all: () => ['member'],
  list: () => [...memberKeys.all(), 'list'],
  details: () => [...memberKeys.all(), 'detail'],
  detail: (email: string | undefined) => [...memberKeys.details(), email],
};

function useSettingMember(options?: {}): any {
  const { get } = useFetchWrapper();
  const setMember = useSetRecoilState(memberAtom);
  const { data: session } = useSession();

  return useQuery({
    queryKey: memberKeys.detail(session?.token.subject),
    queryFn: () => get({ url: `/member/${session?.token.subject}` }),
    enabled: !!session?.token.subject,
    refetchOnMount: true,
    select: (data) => data.data,
    onSuccess: (data) => {
      if (data.code === 200) {
        setMember({
          name: data.data.name,
          email: data.data.email,
          bankName: data.data.bankName,
          nickName: data.data.nickName,
          accountNumber: data.data.accountNumber,
          phoneNumber: data.data.phoneNumber,
          bio: data.data.bio,
        });
      }
    },
  });
}

function useInfiniteMemberList(options?: {}): any {
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
    ...options,
  });
}

export { useSettingMember, useInfiniteMemberList };
