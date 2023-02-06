import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation} from '@tanstack/react-query';

interface UpdateForm {
  email: string;
  phoneNumber: string;
  bio: string;
}

const memberKeys = {
  all: () => ['memberKeys'],
  list: () => [...memberKeys.all(), 'list'],
  details: () => [...memberKeys.all(), 'detail'],
  detail: (email: string) => [...memberKeys.details(), email],
  update: () => ['member-update'],
};

function useMemberUpdate(): any {
  const {patch} = useFetchWrapper();

  return useMutation({
    mutationKey: memberKeys.update(),
    mutationFn: (value: UpdateForm) =>
      patch({url: `/member/setting/info/${value.email}`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
    onError: (error, variables, context) => {},
  });
}

export {useMemberUpdate};
