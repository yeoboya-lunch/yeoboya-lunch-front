import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const isLoginActive = ['/user/sign-up', '/auth/login'];
  const requireTokenURLs = '/profile, /order';

  if (isLoginActive.includes(pathname)) {
    if (request.cookies.get('refreshToken')?.value) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!request.cookies.get('refreshToken')?.value) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
}
