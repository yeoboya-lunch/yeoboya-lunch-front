import './globals.css';

import { Metadata } from 'next';
import localFont from 'next/font/local';

import { cn } from '@/app/_lib/utils';

import AuthProvider from './_components/AuthProvider';
import ReactQueryProvider from './_components/ReactQueryProvider';
import StateProvider from './_components/StateProvider';

export const metadata: Metadata = {
  title: '점심 파티 모집',
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
              <StateProvider>{children}</StateProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
