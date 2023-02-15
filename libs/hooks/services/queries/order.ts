import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';

const orderKeys = {
  all: () => ['order'],
  list: () => [...orderKeys.all(), 'list'],
  details: () => [...orderKeys.all(), 'detail'],
  detail: (orderId: string) => [...orderKeys.details(), orderId],
};

function useInfiniteOrders(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 30;

  return useInfiniteQuery(
    [orderKeys.all()],
    ({pageParam = 1}) => get({url: `/order/recruits`, params: {size: size, page: pageParam}}),
    {
      ...options,
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
