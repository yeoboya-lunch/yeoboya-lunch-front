import {useQuery} from '@tanstack/react-query';
import {get} from '@libs/client/api';

export function useProfiles(options: {} = {}) {
  return useQuery(['queryKeys'], () => get(`/member`), options);
}

export function useProfileSimple(memberId: String, options: {} = {}) {
  return useQuery(['queryKeys.simple'], () => get(`/member/${memberId}`), options);
}

export function useProfileAccount(memberId: String, options: {} = {}) {
  return useQuery(['queryKeys.account'], () => get(`/member/account/${memberId}`), options);
}
