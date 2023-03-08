import type {NextPage} from 'next';
import Layout from '@components/layout';
import {useRecruitQuery} from '@libs/hooks/services/queries/order';
import {useRouter} from 'next/router';
import {IItem, IRecruitItem} from '../../types/order';
import {
  useOrderRecruitGroupExit,
  useOrderRecruitGroupJoin,
} from '@libs/hooks/services/mutations/order';
import {useRecoilValue} from 'recoil';
import memberAtom from '@libs/recoil/member';
import {useState} from 'react';
import {getSession, GetSessionParams} from 'next-auth/react';

const RecruitPost: NextPage = () => {
  const router = useRouter();
  const member = useRecoilValue(memberAtom);
  console.log(member);
  const {data: recruit} = useRecruitQuery(router.query.id as string);
  const orderRecruitJoin = useOrderRecruitGroupJoin();
  const orderRecruitExit = useOrderRecruitGroupExit();

  const [cart, setCart] = useState<IRecruitItem[]>([]);

  const addCart = (item: any) => {
    setCart([...cart, {itemName: item.name, orderQuantity: 1}]);
  };

  const deleteCart = (value: any) => {
    setCart((oldValues) => {
      return oldValues.filter((item) => item != value);
    });
  };

  return (
    <Layout title={recruit?.order.title} canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {recruit?.shop.shopName}
        </span>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {recruit?.order.orderStatus}
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3 border-b items-center space-x-3">
          <div>
            <p className="text-sm font-medium text-gray-700">{recruit?.order.title}</p>
            <p className="text-xs font-medium text-gray-500">{recruit?.orderMember.name}</p>
          </div>
        </div>
        <div className="border-b">
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">마감시간</span>
            <span className="text-xs font-medium text-gray-500">
              {recruit?.order.lastOrderTime}
            </span>
          </div>

          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">배달비</span>
            <span className="text-xs font-medium text-gray-500">{recruit?.order.deliveryFee}</span>
          </div>

          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">당직자 메모</span>
            <span className="text-xs font-medium text-gray-500">{recruit?.order.memo}</span>
          </div>
        </div>
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recruit?.shop.items.map((item: IItem, index: number) => {
              return (
                <li key={index} className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.price}원
                      </p>
                    </div>
                    <button
                      className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                      onClick={() => addCart(item)}
                    >
                      장바구니 담기
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>{cart.length}</p>
          {cart.map((item, index) => {
            return (
              <>
                <p>{item.itemName}</p>
                <button onClick={() => deleteCart(item)}>카트 삭제</button>
              </>
            );
          })}
        </div>
        ---------------------
        <div
          onClick={() =>
            orderRecruitJoin.mutate({
              orderNo: router.query.id,
              email: member.email,
              orderItems: cart,
            })
          }
        >
          주문서 넣기
        </div>
        ---------------------
        <div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recruit?.group.map((group: any, index: number) => {
              return (
                <li key={index} className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      파티원 : {group.name}
                      {group.orderItem.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <p>itemName: {item.itemName}</p>
                            <p>orderQuantity: {item.orderQuantity}</p>
                          </div>
                        );
                      })}
                      {group.totalPrice}
                    </div>
                  </div>
                  {member.email === group.email && (
                    <button
                      onClick={() => {
                        orderRecruitExit.mutate(group.groupOrderId);
                      }}
                    >
                      주문취소
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default RecruitPost;

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
}
