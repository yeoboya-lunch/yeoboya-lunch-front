import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/app/_components/ui/Card';
import defaultImg from '/public/image-4@2x.jpg';
import UserProfile from '@/app/_components/ui/user/UserProfile';

const users = [
  {
    image: defaultImg.src,
    name: '라이언1',
  },
  {
    image: defaultImg.src,
    name: '라이언2',
  },
  {
    image: defaultImg.src,
    name: '라이언3',
  },
  {
    image: defaultImg.src,
    name: '라이언4',
  },
];

const OrderCard = () => {
  return (
    <Card className="flex overflow-hidden">
      <Image className="w-1/5" src={defaultImg} alt="메뉴 사진" />
      <CardContent className="flex flex-grow flex-col gap-2 pt-4">
        <CardTitle>메뉴 이름</CardTitle>
        <CardDescription>₩ 메뉴 가격</CardDescription>
        <ul className="flex items-center justify-between">
          <li className="flex space-x-[-16px]">
            {users.map((user, index, array) => (
              <UserProfile
                image={user.image}
                alt={user.name}
                style={{ zIndex: array.length - index }}
              />
            ))}
          </li>
          <li>합계: 가격</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
