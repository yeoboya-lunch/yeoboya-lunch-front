import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {useMutation, useQueryClient} from '@tanstack/react-query';

function useBoardWrite(): any {
  const {post} = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: ['board', 'write'],
    mutationFn: (value: IWriteForm) => post({url: `/board/write`, data: value}),
    onMutate: (variables) => {},
    onSuccess: (data, variables, context) => {},
    onSettled: (data, error, variables, context) => {
      return cache.invalidateQueries(['board', 'write']);
    },
    onError: (error, variables, context) => {},
  });
}

export {useBoardWrite};
