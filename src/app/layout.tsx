import { Metadata } from 'next';
import localFont from 'next/font/local';
import { cn } from '@/app/_lib/utils';
import ReactQueryProvider from './_components/ReactQueryProvider';
import AuthProvider from './_components/AuthProvider';
import StateProvider from './_components/StateProvider';
import './globals.css';

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
      <body className={cn('h-lvh font-pretendard', font.variable)}>
        <ReactQueryProvider>
          <AuthProvider>
            <StateProvider>{children}</StateProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
