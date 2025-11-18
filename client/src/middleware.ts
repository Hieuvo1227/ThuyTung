import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'token';

export async function middleware(request: NextRequest) {
  console.log("🌐 Client middleware called for URL:", request.url);
  const { pathname } = request.nextUrl;
  console.log("📍 Pathname:", pathname);
  
  const response = NextResponse.next();

  response.headers.set('X-DNS-Prefetch-Control', 'on');

  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  console.log("🎫 Auth token from cookies:", authToken ? authToken.substring(0, 20) + "..." : "[NONE]");

  // For now, just check if token exists (simplified approach)
  const isAuthenticated = !!authToken;
  console.log("✅ Is authenticated (token exists):", isAuthenticated);

  // Mobile block example (keep if intended)
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
  console.log("📱 Is mobile device:", isMobile);
  
  if (isMobile && (pathname.startsWith('/admin') || pathname.startsWith('/auth'))) {
    console.log("🚫 Blocking mobile access to admin/auth pages");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users trying to access /admin
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    console.log("🔒 Unauthenticated user trying to access admin, redirecting to login");
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && pathname.startsWith('/auth')) {
    console.log("✅ Authenticated user trying to access auth pages, redirecting to admin");
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  console.log("✅ Middleware check passed, continuing with request");
  return response;
}

export const config = {
  // explicit matcher for admin + general fallback
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};