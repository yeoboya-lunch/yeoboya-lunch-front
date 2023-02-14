import type {NextPage} from 'next';
import Layout from '@components/layout';
import Image from 'next/image';
import profilePic from '../../public/image-4@2x.jpg';
import Item from '@components/item';

const Shop: NextPage = () => {
  //식당정보 select

  return (
    <Layout canGoBack title="식당선택">
      <div className="flex flex-wrap justify-evenly items-center gap-2.5 mt-3.5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => {
          return (
            <div className="flex flex-wrap" key={i}>
              <Image
                className="rounded-full w-2/6 h-2/6"
                src={profilePic}
                alt="image description"
              />
              <div className="flex">ㅁㄷㄴㄷ</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Shop;
