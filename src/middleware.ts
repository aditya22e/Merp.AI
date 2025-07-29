import { NextRequest, NextResponse } from 'next/server';

// Placeholder middleware function
export default async function middleware(request: NextRequest) {
  // Log request for debugging
  console.log('Middleware triggered for:', request.nextUrl.pathname);

  // Placeholder: Allow all requests (to be updated in Step 3)
  return NextResponse.next();
}

// Optional: Define which paths the middleware applies to
export const config = {
  matcher: ['/api/notes/:path*', '/api/chat/mentor/:path*'],
};