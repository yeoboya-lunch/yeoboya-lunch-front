import './globals.css';

import AuthProvider from 'app/_components/AuthProvider';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';

import Spinner from '@/app/_components/ui/Spinner';
import { cn } from '@/app/_lib/utils';

import ReactQueryProvider from './_components/ReactQueryProvider';

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
            <AuthProvider>
              <Suspense fallback={<Spinner />}>{children}</Suspense>
            </AuthProvider>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
