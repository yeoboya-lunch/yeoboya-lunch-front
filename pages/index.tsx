import type {InferGetStaticPropsType, NextPage} from 'next';
import FloatingButton from '../components/floating-button';
import Item from '../components/item';
import Layout from '../components/layout';

const Home: NextPage = ({item}: InferGetStaticPropsType<any>) => {
  console.log(item.data);
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item id={i} key={i} title="iPhone 14" price={99} comments={1} hearts={1} />
        ))}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:463/item?page=0&size=100&sort=price,asc', {
    method: 'GET',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJra2xhdGg5OTE5QG5hdmVyLmNvbSIsImp0aSI6IjRmZjkzMWNjLTBhZDQtNDc1Ni1hMTQ4LTA5YWZkZTVlZjc4MyIsImlzcyI6Inllb2JveWEiLCJpYXQiOjE2NzQ0NTE4NzUsImV4cCI6MTY3NDUzODI3NSwiYXV0aCI6IlJPTEVfVVNFUiJ9.mOfZ9jcPBY3J_8t_gen80V4PcPXlix-uc_g0xTtUguQ`,
    },
  });
  const item = await res.json();

  return {
    props: {
      item,
    },
  };
}

export default Home;
