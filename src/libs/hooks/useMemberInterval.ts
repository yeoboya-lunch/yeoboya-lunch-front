import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import useFetchWrapper from '@/libs/client/fetch-wrapper';
import memberAtom from '@/libs/recoil/member';

function useMemberInterval() {
  const [refreshStop, setRefreshStop] = useState(false);
  const [member, setMember] = useRecoilState(memberAtom);
  const resetMember = useResetRecoilState(memberAtom);
  const { get } = useFetchWrapper();
  const router = useRouter();

  useQuery({
    queryKey: ['REFRESH'],

    queryFn: () =>
      get({
        url: `/member/${member.email}`,
      }),

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
    refetchInterval: refreshStop ? false : 5000 * 10 * 10,
    refetchIntervalInBackground: true,
    enabled: !!member.email,
    select: (data) => data.data.data,

    // 5에서 사라짐
    // onSuccess: (data) => {
    //   setMember({
    //     name: data.name,
    //     email: data.email,
    //     bankName: data.bankName,
    //     nickName: data.nickName,
    //     accountNumber: data.accountNumber,
    //     phoneNumber: data.phoneNumber,
    //     bio: data.bio,
    //   });
    // },
    //
    // onError: () => {
    //   setRefreshStop(true);
    //   resetMember();
    //   router.push('/');
    // }
  });
}

export { useMemberInterval };
