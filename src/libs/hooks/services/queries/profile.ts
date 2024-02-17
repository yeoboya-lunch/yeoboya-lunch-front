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
  return useQuery(
    {
      queryKey: profileKeys.all(),
      queryFn: () => get({ url: `/member` }),
    },
    {
      ...options,
      onSuccess: (data) => {},
      onError: (err) => {},
      onSettled: () => {},
    },
  );
}

function useProfileSimple(memberId: string, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery(
    {
      queryKey: profileKeys.detail(memberId),
      queryFn: () => get({ url: `/member/${memberId}` }),
    },
    {
      ...options,
      onError: (err) => {
        console.log('err', err);
      },
      onSettled: () => {},
    },
  );
}

function useProfileAccount(memberId: string, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery({
    queryKey: ['queryKeys.account'],
    queryFn: () => get({ url: `/member/account/${memberId}` }),
    ...options,

    onError: (err: Error) => {
      console.log('err', err);
    },

    onSettled: () => {
      console.log('blue check');
    },
  });
}

export { useProfiles, useProfileSimple, useProfileAccount };
