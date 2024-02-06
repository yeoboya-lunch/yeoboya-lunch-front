import Link from 'next/link';
import profilePic from '../../../public/image-4@2x.jpg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import { useObserver } from '@libs/client/useObserver';

interface IRecruitProps {
  orderId: number;
  orderMemberName: string;
  shopName: string;
  title: string;
  lastOrderTime: string;
  orderStatus: string;
  groupCount: number;
}

export default function OrderRecruitCard({
  orderId,
  orderMemberName,
  shopName,
  title,
  lastOrderTime,
  orderStatus,
  groupCount,
}: IRecruitProps) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  const [scrollY, setScrollY] = useLocalStorage('recruit_list_scroll', 0);

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting ? setVisible(true) : setVisible(false);

  useObserver({
    target,
    onIntersect,
    threshold: 0.1,
  });

  return (
    <li className="mb-2 flex border-gray-400">
      <div
        className="flex flex-1 transform cursor-pointer select-none
                    items-center rounded-md bg-white p-4
                    shadow transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
      >
        <Link
          href={`/order/${orderId}`}
          className="flex flex-1 items-center justify-between"
          ref={target}
          onClick={() => setScrollY(window.scrollY)}
        >
          <div className="flex flex-col items-center justify-center ">
            <Image
              className="mx-auto h-20 w-20 rounded-md object-cover"
              src={profilePic}
              alt={'기본이미지'}
            />
            <span className="pt-2 text-sm text-gray-800">{shopName}</span>
          </div>

          <div className="ml-4 mr-4 flex flex-grow">
            <div className="flex-1">
              <span className="inline-flex rounded-xl bg-green-100 px-0.5 py-0.5 text-sm text-gray-800">
                {orderStatus}
              </span>
              <div className="flex w-64 dark:text-white">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-200">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{orderMemberName}</p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center ">
              <div className="text-xs text-gray-600 dark:text-gray-200">{lastOrderTime}</div>
              <div className="flex items-end justify-end">
                <div className="flex items-center space-x-0.5 text-sm text-gray-600">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <path d="M42 22.3c-2.8-1.1-3.2-2.2-3.2-3.3s.8-2.2 1.8-3c1.7-1.4 2.6-3.5 2.6-5.8 0-4.4-2.9-8.2-8-8.2-4.7 0-7.5 3.2-7.9 7.1 0 .4.2.7.5.9 3.8 2.4 6.1 6.6 6.1 11.7 0 3.8-1.5 7.2-4.2 9.6-.2.2-.2.6 0 .8.7.5 2.3 1.2 3.3 1.7.3.1.5.2.8.2h12.1c2.3 0 4.1-1.9 4.1-4v-.6c0-3.5-3.8-5.4-8-7.1z" />
                    <path d="M28.6 36.2c-3.4-1.4-3.9-2.6-3.9-3.9 0-1.3 1-2.6 2.1-3.6 2-1.7 3.1-4.1 3.1-6.9 0-5.2-3.4-9.7-9.6-9.7-6.1 0-9.6 4.5-9.6 9.7 0 2.8 1.1 5.2 3.1 6.9 1.1 1 2.1 2.3 2.1 3.6 0 1.3-.5 2.6-4 3.9-5 2-9.9 4.3-9.9 8.5V46c0 2.2 1.8 4 4.1 4h27.7c2.3 0 4.2-1.8 4.2-4v-1.4c0-4.1-4.4-6.4-9.4-8.4z" />
                  </svg>
                  <span className="text-sm text-gray-600">{groupCount}</span>
                </div>
              </div>
            </div>
          </div>

          <button className="flex justify-end">
            <svg
              width="12"
              fill="currentColor"
              height="12"
              className="text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </Link>
      </div>
    </li>
  );
}
