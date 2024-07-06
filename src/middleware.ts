import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async (req) => {
  if (!req.cookies.get('token')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
};

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth|board$|$).*)'],
};
