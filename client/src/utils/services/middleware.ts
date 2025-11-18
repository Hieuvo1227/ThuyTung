import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const AUTH_COOKIE_NAME = 'token';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();

    response.headers.set('X-DNS-Prefetch-Control', 'on');
    if (pathname === '/') {
        response.headers.set('Link', [ /* ... */].join(', '));
    }
    if (pathname.startsWith('/_next/static/')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (authToken) {
        try {
            const payload = authToken.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
            isAuthenticated = !!decodedPayload.id;

        } catch (err: unknown) {
            isAuthenticated = false;
        }
    }
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

    if (isMobile && (pathname.startsWith('/admin') || pathname.startsWith('/auth'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/admin') && !isAuthenticated) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirectedFrom', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return response;
}

// --- Cấu hình Matcher ---
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};