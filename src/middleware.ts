import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

const secret = process.env.SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });

  const { pathname } = req.nextUrl;

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
