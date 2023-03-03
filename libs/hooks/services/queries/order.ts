import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {orderKeys} from '@libs/hooks/services/keys/order';
import dayjs from 'dayjs';

function useInfiniteOrders(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 6;
  let today = dayjs().format('YYYYMMDD');
  let startDay = dayjs(today).subtract(7, 'day').format('YYYYMMDD');

  return useInfiniteQuery(
    orderKeys.list(),
    ({pageParam = 1}) =>
      get({
        url: `/order/recruits`,
        params: {size: size, page: pageParam, startDate: startDay, endDate: today},
      }),
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

function useRecruitQuery(orderNo: string, options?: {}): any {
  const {get} = useFetchWrapper();

  return useQuery(orderKeys.detail(orderNo), () => get({url: `/order/recruit/${orderNo}`}), {
    ...options,
    select: (data) => data.data.data,
    onSuccess: (data) => {},
  });
}

export {useInfiniteOrders, useRecruitQuery};
