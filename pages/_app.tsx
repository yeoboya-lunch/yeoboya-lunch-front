import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {CookiesProvider} from 'react-cookie';
import {useSilentRefresh} from '@libs/client/useSilentRefresh';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <Component {...pageProps} />
        </CookiesProvider>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
