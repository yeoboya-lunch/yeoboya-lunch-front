import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
