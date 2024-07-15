import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import apiClient from '@/libs/client/apiClient';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

//회원정보 수정(public profile)
export const usePublicProfileUpdate = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (value: UpdateForm) =>
      apiClient.patch({ url: `/member/setting/info/${value.email}`, data: value }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

//회원정보 수정(account)
export const useAccountSave = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (value: UpdateForm) => apiClient.post({ url: `/member/account`, data: value }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

export const useAccountInfoUpdate = () => {
  return useMutation({
    mutationFn: (value: UpdateForm) =>
      apiClient.patch({ url: `/member/account/${value.email}`, data: value }),
  });
};
