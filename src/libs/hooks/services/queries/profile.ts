import { useQuery } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

const profileKeys = {
  all: () => ['profile'],
  list: () => [...profileKeys.all(), 'list'],
  details: () => [...profileKeys.all(), 'detail'],
  detail: (memberId: string) => [...profileKeys.details(), memberId],
};

function useProfiles(options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery({
    queryKey: profileKeys.all(),
    queryFn: () => get({ url: `/member` }),
    ...options,
  });
}

function useProfileSimple(memberId: string, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery({
    queryKey: profileKeys.detail(memberId),
    queryFn: () => get({ url: `/member/${memberId}` }),
    ...options,
  });
}

function useProfileAccount(memberId: string, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery({
    queryKey: ['queryKeys.account'],
    queryFn: () => get({ url: `/member/account/${memberId}` }),
    ...options,
  });
}

export { useProfiles, useProfileSimple, useProfileAccount };
