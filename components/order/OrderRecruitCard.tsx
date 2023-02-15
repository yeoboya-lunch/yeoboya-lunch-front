import Link from 'next/link';

interface IRecruitProps {
  orderId: number;
  orderMemberName: string;
  shopName: string;
  title: string;
  lastOrderTime: string;
  orderStatus: string;
}

export default function OrderRecruitCard({
  orderId,
  orderMemberName,
  shopName,
  title,
  lastOrderTime,
  orderStatus,
}: IRecruitProps) {
  return (
    <li className="flex flex-row mb-2 border-gray-400">
      <div
        className="transition duration-500 shadow ease-in-out transform
                    hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer
                    bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4"
      >
        <Link href={`/items/${orderId}`}>
          <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
            <img
              alt="image"
              src="/images/person/6.jpg"
              className="mx-auto object-cover rounded-md h-20 w-20"
            />
          </div>

          <div className="flex pl-1">
            <div className="font-medium dark:text-white">{title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-200">{orderMemberName}</div>

            <div className="text-xs text-gray-600 dark:text-gray-200">{lastOrderTime}</div>
            <div className="flex space-x-2 items-end justify-end">
              <div className="flex space-x-0.5 items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span>+122</span>
              </div>
            </div>
          </div>

          <button className="flex justify-end text-right">
            <svg
              width="12"
              fill="currentColor"
              height="12"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
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
