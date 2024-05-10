import { MiddlewareConfig } from 'next/server';

export { default } from 'next-auth/middleware';

export const config: MiddlewareConfig = {
  matcher: ['/profile/:path*', '/order/:path*', '/shop/:path*', '/board/:path*', '/member/:path*'],
};
