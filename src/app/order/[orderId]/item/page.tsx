'use client';

import { Button } from '@/app/_components/ui/Button';
import OrderItemCard from '@/app/order/[orderId]/item/_components/OrderItemCard';
import Layout from '@/components/layout';
import { useOrderItems } from '@/features/order/useOrderItems';

type Props = {
  params: {
    orderId: string;
  };
};

const OrderItemPage = ({ params }: Props) => {
  const { myOrder, shopItems, updateQuantity, findOrderItem, handleSubmit } = useOrderItems(
    params.orderId,
  );

  return (
    <Layout title="메뉴 담기" className="flex-grow" canGoBack>
      <div className="flex flex-grow flex-col justify-between gap-8 bg-secondary">
        <ul className="flex flex-col gap-4 border-b-2 bg-white pb-4">
          {shopItems?.map((item) => (
            <OrderItemCard
              key={item.name}
              item={{
                ...item,
                orderQuantity: findOrderItem(myOrder.orderItem, item.name)?.orderQuantity ?? 0,
              }}
              updateQuantity={(quantity) => updateQuantity({ itemName: item.name, quantity })}
            />
          ))}
        </ul>
        <div className="flex flex-col gap-8 border-t-[1px] bg-white p-2">
          <div className="flex justify-between">
            <dt className="text-lg font-semibold">총 금액</dt>
            <dd className="text-lg font-semibold">{myOrder?.totalPrice ?? 0} 원</dd>
          </div>
          <Button
            className="w-full"
            disabled={myOrder.totalPrice === 0}
            onClick={() =>
              handleSubmit(
                myOrder.orderItem.map(({ itemName, orderQuantity }) => ({
                  itemName: itemName,
                  orderQuantity,
                })),
              )
            }
          >
            메뉴 담기
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderItemPage;
