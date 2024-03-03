import { List } from '@/libs/client/fetch-wrapper';
import { Order } from '@/domain/order';
import { OrderListFilter } from '@/app/_features/order/orderQueryKeys';
import createApiClient from '@/libs/client/use-fetch-wrapper';

const getOrderList = async ({}: OrderListFilter) => {
  const {get} = await createApiClient();
    await get<List<Order>>({
      url: `/order/recruits`,
      params: {
        page: pageParam,
        orderEmail,
        startDate,
        endDate,
      },
    });
    return data;
  },
}