import {useQuery} from '@tanstack/react-query';
import {get} from '@libs/client/api';

export const profileKeys = {
  all: () => ['profile'],
  list: () => [...profileKeys.all(), 'list'],
  details: () => [...profileKeys.all(), 'detail'],
  detail: (memberId: string) => [...profileKeys.details(), memberId],
};

export function useProfiles(options: {} = {}) {
  return useQuery([profileKeys.all()], () => get({url: `/member`}), {
    ...options,
    onError: (err) => {
      console.log('err', err);
    },
    onSettled: () => {
      // console.log('useProfiles check');
    },
  });
}

export function useProfileSimple(memberId: string, options: {} = {}) {
  return useQuery([profileKeys.detail(memberId)], () => get({url: `/member/${memberId}`}), {
    ...options,
    onError: (err) => {
      console.log('err', err);
    },
    onSettled: () => {
      console.log('useProfileSimple check');
    },
  });
}

export function useProfileAccount(memberId: String, options: {} = {}) {
  return useQuery(['queryKeys.account'], () => get({url: `/member/account/${memberId}`}), {
    ...options,
    onError: (err: Error) => {
      console.log('err', err);
    },
    onSettled: () => {
      console.log('blue check');
    },
  });
}
