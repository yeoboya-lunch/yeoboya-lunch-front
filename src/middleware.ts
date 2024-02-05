import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = await getToken({ req, secret, raw: true });

  const { pathname } = req.nextUrl;
  console.log('값 찍힘? ', session);

  // console.log('-------------');
  // console.log(pathname);

  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/sign-up')) {
    if (session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (pathname.startsWith('/profile') || pathname.startsWith('/shop')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/profile/:path*',
    '/order/:path*',
    '/shop/:path*',
    '/community/:path*',
  ],
};
