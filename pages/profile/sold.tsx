import type {NextPage} from 'next';
import Item from '@components/item';
import Layout from '@components/layout';
import {useInfiniteOrders} from '@libs/hooks/services/queries/order';
import {getSession, GetSessionParams, useSession} from 'next-auth/react';

const Sold: NextPage = ({session}) => {
  console.log(session);

  // const {data: session, status: statue} = useSession();
  // const orders = useInfiniteOrders({
  //   orderEmail: session?.token.subject,
  // });
  //
  // console.log(session?.token.subject);

  return (
    <Layout title="주문내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item id={i} key={i} title="iPhone 14" price={99} comments={1} hearts={1} />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;

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

  console.log('session is ', session);

  return {
    props: {
      session,
    },
  };
}
