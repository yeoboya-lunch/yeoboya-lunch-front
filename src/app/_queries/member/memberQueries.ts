import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { memberKeys } from 'app/_queries/member/memberQueryKeys';
import { useLoginId } from 'app/member/useMemberStore';
import apiClient, { InfiniteScrollData } from 'client/apiClient';
import { Member } from 'domain/member';

type Profile = {
  phoneNumber?: number;
  account?: boolean;
} & Member;

export const useSettingMember = () => {
  const loginId = useLoginId();
  return useQuery({
    queryKey: memberKeys.detail(loginId),
    queryFn: () => apiClient.get<Profile>(`/member/${loginId}/summary`),
    enabled: !!loginId,
    select: (data) => data,
  });
};

export const useInfiniteMemberList = (page = 0) => {
  const size = 30;

  return useInfiniteQuery({
    queryKey: memberKeys.list({ page, size }),
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams({
        size: size.toString(),
        page: pageParam.toString(),
      });

      return apiClient.get<InfiniteScrollData<Member>>('/member', { params });
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
