import { useMutation } from '@tanstack/react-query';
import apiClient from 'client/apiClient';
import { useRouter } from 'next/navigation';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

//회원정보 수정(public profile)
export const usePublicProfileUpdate = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateForm) =>
      apiClient.patch(`/member/setting/info/${data.email}`, { data }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

//회원정보 수정(account)
export const useAccountSave = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateForm) => apiClient.post(`/member/account`, { data }),
    onSuccess: () => {
      return router.push('/profile');
    },
  });
};

export const useAccountInfoUpdate = () => {
  return useMutation({
    mutationFn: (data: UpdateForm) => apiClient.patch(`/member/account/${data.email}`, { data }),
  });
};
