import { useMutation } from '@tanstack/react-query';

import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const useBoardWrite = () => {
  const { post } = useFetchWrapper();

  return useMutation({
    mutationFn: (value) => post({ url: `/board/write`, data: value }),
  });
};
