import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Optimize middleware matcher to reduce Fast Origin Transfer
  // Match only necessary paths to avoid double-processing
  matcher: [
    // Match all pages but exclude:
    // - API routes (handled separately)
    // - Static assets (don't need i18n)
    // - Next.js internals
    // - Files with extensions (images, fonts, etc.)
    '/((?!api|trpc|_next|_vercel|favicon|sitemap|robots|.*\\.[^/]*).*)',
  ],
};
