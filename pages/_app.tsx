import '../styles/globals.css';
import type {AppContext, AppInitialProps, AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CookiesProvider} from 'react-cookie';
import {RecoilRoot} from 'recoil';
import {SessionProvider} from 'next-auth/react';
import React, {useEffect} from 'react';

// function DebugObserver(): React.Node {
//   const snapshot = useRecoilSnapshot();
// useEffect(() => {
//   console.group('atom');
//   for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
//     console.log(node.key, ':', snapshot.getLoadable(node));
//   }
//   console.groupEnd();
// }, [snapshot]);

// return null;
// }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      staleTime: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <RecoilRoot>
              {/*<DebugObserver />*/}
              <ReactQueryDevtools initialIsOpen={true} />
              <Component {...pageProps} />
            </RecoilRoot>
          </CookiesProvider>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}

MyApp.getInitialProps = async ({Component, ctx}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {pageProps};
};

export default MyApp;
