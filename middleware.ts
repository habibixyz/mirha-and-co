import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // If the user already has a preferred currency saved, respect it.
  // Otherwise, use Vercel's geolocation header to set a default.
  if (!request.cookies.has('mirha_currency')) {
    // x-vercel-ip-country is a 2-letter ISO country code (e.g. US, IN, GB)
    const country = request.headers.get('x-vercel-ip-country') || 'IN';
    
    let defaultCurrency = 'INR';
    
    if (country === 'US') {
      defaultCurrency = 'USD';
    } else if (country === 'GB') {
      defaultCurrency = 'GBP';
    } else if (country === 'AE') {
      defaultCurrency = 'AED';
    } else if (country === 'SA') {
      defaultCurrency = 'SAR';
    } else if (['DE', 'FR', 'IT', 'ES', 'NL', 'IE'].includes(country)) {
      defaultCurrency = 'EUR';
    } else if (country !== 'IN') {
      // Default fallback for other international users
      defaultCurrency = 'USD';
    }
    
    // Set the cookie on the response so future requests have it
    response.cookies.set('mirha_currency', defaultCurrency, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    // Also pass it down to the server components in the current request
    response.headers.set('x-default-currency', defaultCurrency);
  }
  
  return response;
}

export const config = {
  // Run middleware on all routes except static files, API, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
