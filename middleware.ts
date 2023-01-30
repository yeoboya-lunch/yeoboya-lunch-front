import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/')) {
  }

  if (
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/user/sign-up')
  ) {
    if (req.cookies.get('refreshToken')?.value) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/profile')) {
    if (!req.cookies.get('refreshToken')?.value) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
