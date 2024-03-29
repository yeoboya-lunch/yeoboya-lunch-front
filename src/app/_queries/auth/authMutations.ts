import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useResetRecoilState } from 'recoil';

import { User } from '@/domain/user';
import useFetchWrapper from '@/libs/client/fetch-wrapper';
import memberAtom from '@/libs/recoil/member';

const userKeys = {
  all: () => ['user'],
  list: () => [...userKeys.all(), 'list'],
  details: () => [...userKeys.all(), 'detail'],
  detail: (email: string) => [...userKeys.details(), email],
  insert: () => ['sign-up'],
};

export function useSignUp() {
  const { post } = useFetchWrapper();

  return useMutation({
    mutationKey: userKeys.insert(),
    mutationFn: (value: User) => post({ url: `/user/sign-up`, data: value }),
  });
}

export function useLogout() {
  const { post } = useFetchWrapper();
  const router = useRouter();
  const resetMember = useResetRecoilState(memberAtom);
  return useMutation({
    mutationFn: () =>
      post({
        url: '/user/sign-out',
        data: {
          // accessToken: token,
          // refreshToken: jwtToken.refreshToken,
        },
      }),
    onMutate: () => {},
    onSuccess: (data) => {
      if (data.status === 200) {
        resetMember();
        router.push('/');
      }
    },
  });
}
