import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

const memberKeys = {
  update: (key: string) => ['member-update', key],
  detail: (key: string) => ['member-detail', key],
  save: () => ['member-save'],
};

//회원정보 수정(public profile)
function usePublicProfileUpdate(): any {
  const { patch } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationKey: memberKeys.update('publicProfile'),
    mutationFn: (value: UpdateForm) =>
      patch({ url: `/member/setting/info/${value.email}`, data: value }),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {
      return router.push('/profile');
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

//회원정보 수정(account)
function useAccountSave(): any {
  const { post } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationKey: memberKeys.update('saveAccount'),
    mutationFn: (value: UpdateForm) => post({ url: `/member/account`, data: value }),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {
      return router.push('/profile');
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

function useAccountInfoUpdate(): any {
  const { patch } = useFetchWrapper();
  const router = useRouter();

  return useMutation({
    mutationKey: memberKeys.update('temp'),
    mutationFn: (value: UpdateForm) =>
      patch({ url: `/member/account/${value.email}`, data: value }),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {
      // return router.push('/profile');
    },
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export { usePublicProfileUpdate, useAccountInfoUpdate, useAccountSave };
