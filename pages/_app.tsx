import '../styles/globals.css';
import type {AppContext, AppInitialProps, AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CookiesProvider} from 'react-cookie';
import {RecoilRoot, useRecoilSnapshot} from 'recoil';
import React, {useEffect} from 'react';

function DebugObserver(): React.Node {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.log('The following atoms were modified:');
    for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
      console.log(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

const queryClient = new QueryClient({});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <RecoilRoot>
            <DebugObserver />
            <ReactQueryDevtools initialIsOpen={true} />
            <Component {...pageProps} />
          </RecoilRoot>
        </CookiesProvider>
      </QueryClientProvider>
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
