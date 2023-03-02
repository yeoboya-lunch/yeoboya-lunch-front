import type {NextPage} from 'next';
import Layout from '@components/layout';
import TextArea from '@components/textarea';
import {useRecruitQuery} from '@libs/hooks/services/queries/order';
import {useRouter} from 'next/router';

const RecruitPost: NextPage = () => {
  const router = useRouter();
  const {data: recruit} = useRecruitQuery(router.query.id as string);
  console.log(recruit);

  return (
    <Layout canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {recruit?.shop.shopName}
        </span>

        <div className="flex mb-3 px-4 cursor-pointer pb-3 border-b items-center space-x-3">
          <div>
            <p className="text-sm font-medium text-gray-700">{recruit?.order.title}</p>
            <p className="text-xs font-medium text-gray-500">{recruit?.order.lastOrderTime}</p>
          </div>
        </div>

        <div>
          <div className="mt-2 px-4 text-gray-700">
            <p className="text-orange-500 font-medium">{recruit?.order.deliveryFee}</p>
            <p className="text-xs font-medium text-gray-500">배달비는 인원수에 따라 달라집니다.</p>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recruit?.shop.items.map((item, index) => {
            console.log(item, index);
            return (
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {item.price}원
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    장바구니 담기
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default RecruitPost;
