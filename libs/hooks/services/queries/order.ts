import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useFetchWrapper} from '@libs/client/fetch-wrapper';
import {orderKeys} from '@libs/hooks/services/keys/order';
import {useRecoilState} from 'recoil';
import memberAtom from '@libs/recoil/member';

function useInfiniteOrders(options?: {}): any {
  const {get} = useFetchWrapper();
  const size = 6;

  return useInfiniteQuery(
    orderKeys.list(),
    ({pageParam = 1}) =>
      get({
        url: `/order/recruits`,
        params: {size: size, page: pageParam, startDate: '20220101', endDate: '20230302'},
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
