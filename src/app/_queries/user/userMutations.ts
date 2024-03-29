import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

//회원정보 수정(public profile)
export const usePublicProfileUpdate = () => {
  const { patch } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationFn: (value: UpdateForm) =>
      patch({ url: `/member/setting/info/${value.email}`, data: value }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

//회원정보 수정(account)
export const useAccountSave = () => {
  const { post } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationFn: (value: UpdateForm) => post({ url: `/member/account`, data: value }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

export const useAccountInfoUpdate = () => {
  const { patch } = useFetchWrapper();

  return useMutation({
    mutationFn: (value: UpdateForm) =>
      patch({ url: `/member/account/${value.email}`, data: value }),
  });
};
