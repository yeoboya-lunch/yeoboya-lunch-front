import useFetchWrapper from '@libs/client/fetch-wrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardKeys } from '@/community/queries';

const queryKeys = {
  insert: () => [...boardKeys.all(), 'write'],
} as const;

function useBoardWrite() {
  const { post } = useFetchWrapper();
  const cache = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.insert(),
    mutationFn: (value: IWriteForm) => post({ url: `/board/write`, data: value }),
    onSettled: () => {
      return cache.invalidateQueries(queryKeys.insert());
    },
  });
}

export default useBoardWrite;
