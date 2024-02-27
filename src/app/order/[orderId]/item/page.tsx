'use client';

import { Button } from '@/app/_components/ui/Button';
import OrderItemCard from '@/app/order/[orderId]/item/_components/OrderItemCard';
import Layout from '@/components/layout';

const items = [
  { name: 'ㅇㅇ', price: 0 },
  { name: 'ㅇㅇ', price: 0 },
  { name: 'ㅇㅇ', price: 0 },
  { name: 'ㅇㅇ', price: 0 },
];

const CartPage = () => {
  return (
    <Layout title="메뉴 담기" canGoBack>
      <div className="space-y-8 bg-secondary">
        <ul className="flex flex-col gap-4 border-b-2 bg-white pb-4">
          {items.map((item) => (
            <OrderItemCard key={item.name} item={item} />
          ))}
        </ul>
        <div className="flex flex-col gap-8 border-t-[1px] bg-white p-2">
          <div className="flex justify-between">
            <dt className="text-lg font-semibold">총 금액</dt>
            <dd className="text-lg font-semibold">10000 원</dd>
          </div>
          <Button className="w-full">메뉴 담기</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
