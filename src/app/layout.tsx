import ReactQueryProvider from './_components/ReactQueryProvider';
import AuthProvider from './_components/AuthProvider';
import StateProvider from './_components/StateProvider';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/_lib/utils';

export const metadata: Metadata = {
  title: '점심 파티 모집',
};

const font = localFont({
  src: './_assets/font/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn('font-pretendard', font.variable)}>
        <ReactQueryProvider>
          <AuthProvider>
            <StateProvider>{children}</StateProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
