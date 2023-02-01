import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useRecoilState, useSetRecoilState} from 'recoil';
import memberAtom from '@libs/recoil/member';

const memberKeys = {
  all: () => ['user'],
  list: () => [...memberKeys.all(), 'list'],
  details: () => [...memberKeys.all(), 'detail'],
  detail: (email: string) => [...memberKeys.details(), email],
};

function useSettingMember(email: string): any {
  const {get} = useFetchWrapper();
  const [member, setMember] = useRecoilState(memberAtom);

  return useQuery([memberKeys.detail(email)], () => get({url: `/member/account/${email}`}), {
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data);
        setMember({
          name: data.data.data[0].name,
          email: data.data.data[0].email,
          bankName: data.data.data[0].bankName,
          accountNumber: data.data.data[0].accountNumber,
        });
      }
    },
  });
}

export {useSettingMember};
