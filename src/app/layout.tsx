import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import Spinner from '@/app/_components/ui/Spinner';
import { cn } from '@/app/_lib/utils';

import ReactQueryProvider from './_components/ReactQueryProvider';
import StateProvider from './_components/StateProvider';

export const metadata: Metadata = {
  title: '여보야 점심',
};

const font = localFont({
  src: './_assets/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn('font-pretendard', font.variable)}>
        <main className="m-auto flex h-lvh max-w-xl flex-col">
          <ReactQueryProvider>
            <StateProvider>
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </StateProvider>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
