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
    [memberKeys.list()],
    () => get({url: '/member', params: {size: size, page: 1}}),
    {
      ...options,
      // select: (data) => data,
      getNextPageParam: (lastPage) => {
        //fixme api 에서 return data 구조 생각하기
        // console.log(lastPage.data.data.next);
        // if (!lastPage) {
        //   return false;
        // }
        //
        // const offset = new URL(lastPage).searchParams.get('offset');
        return Number(lastPage.data.data.next);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );
}

export {useSettingMember, useInfiniteMemberList};
