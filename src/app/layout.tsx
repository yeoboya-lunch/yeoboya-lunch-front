import ReactQueryProvider from './_components/ReactQueryProvider';
import AuthProvider from './_components/AuthProvider';
import StateProvider from './_components/StateProvider';
import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '점심 파티 모집',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <StateProvider>{children}</StateProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
