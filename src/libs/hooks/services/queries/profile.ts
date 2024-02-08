import { useQuery } from '@tanstack/react-query';
import useFetchWrapper from '@libs/client/fetch-wrapper';

const profileKeys = {
  all: () => ['profile'],
  list: () => [...profileKeys.all(), 'list'],
  details: () => [...profileKeys.all(), 'detail'],
  detail: (memberId: string) => [...profileKeys.details(), memberId],
};

function useProfiles(options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery(profileKeys.all(), () => get({ url: `/member` }), {
    ...options,
    onSuccess: (data) => {},
    onError: (err) => {},
    onSettled: () => {},
  });
}

function useProfileSimple(memberId: string, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery(profileKeys.detail(memberId), () => get({ url: `/member/${memberId}` }), {
    ...options,
    onError: (err) => {
      console.log('err', err);
    },
    onSettled: () => {},
  });
}

function useProfileAccount(memberId: String, options: {} = {}) {
  const { get } = useFetchWrapper();
  return useQuery(['queryKeys.account'], () => get({ url: `/member/account/${memberId}` }), {
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
