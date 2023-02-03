import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useQuery} from '@tanstack/react-query';
import {useRecoilState} from 'recoil';
import memberAtom from '@libs/recoil/member';
import {Simulate} from 'react-dom/test-utils';
import select = Simulate.select;

const memberKeys = {
  all: () => ['user'],
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

export {useSettingMember};
