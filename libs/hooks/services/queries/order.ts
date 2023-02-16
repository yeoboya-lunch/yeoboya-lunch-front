import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {orderKeys} from '@libs/hooks/services/keys/order';

function useInfiniteOrders(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 6;

  return useInfiniteQuery(
    orderKeys.list(),
    ({pageParam = 1}) => get({url: `/order/recruits`, params: {size: size, page: pageParam}}),
    {
      ...options,
      refetchOnMount: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.hasNext) return lastPage.data.data.pageNo + 1;
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.data.data.hasPrevious) return firstPage.data.data.pageNo - 1;
      },
    },
  );
}

export {useInfiniteOrders};
