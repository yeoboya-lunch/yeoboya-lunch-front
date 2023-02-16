import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import memberAtom from '@libs/recoil/member';

const memberKeys = {
  all: () => ['member'],
  list: () => [...memberKeys.all(), 'list'],
  details: () => [...memberKeys.all(), 'detail'],
  detail: (email: string) => [...memberKeys.details(), email],
};

function useSettingMember(options?: {}): any {
  const {get} = useFetchWrapper();
  const [member, setMember] = useRecoilState(memberAtom);

  return useQuery([memberKeys.detail(member.email)], () => get({url: `/member/${member.email}`}), {
    ...options,
    enabled: !!member.email,
    refetchOnMount: true,
    select: (data) => data.data.data,
    onSuccess: (data) => {
      if (data.status === 200) {
        setMember({
          name: data.data.data.name,
          email: data.data.data.email,
          bankName: data.data.data.bankName,
          nickName: data.data.data.nickName,
          accountNumber: data.data.data.accountNumber,
          phoneNumber: data.data.data.phoneNumber,
          bio: data.data.data.bio,
        });
      }
    },
  });
}

function useInfiniteMemberList(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery(
    memberKeys.list(),
    ({pageParam = 1}) => get({url: '/member', params: {size: size, page: pageParam}}),
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
    },
  );
}

export {useSettingMember, useInfiniteMemberList};
