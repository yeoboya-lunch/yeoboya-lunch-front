import { useQuery } from '@tanstack/react-query';

import { boardKeys } from '@/app/_queries/board/boardQueryKeys';
import { PaginationOptions } from '@/client/ApiClient';
import useFetchWrapper from '@/libs/client/fetch-wrapper';

export const useBoardListQuery = ({ page, size }: PaginationOptions) => {
  const { get } = useFetchWrapper();

  return useQuery({
    queryKey: boardKeys.list({
      size: size ?? 10,
      page: page,
    }),
    queryFn: ({ queryKey }) => {
      const [, , { size, page }] = queryKey;
      return get({ url: '/board', params: { size, page } });
    },
    select: (data) => data.data.data,
  });
};
