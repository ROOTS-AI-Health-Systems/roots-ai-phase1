// GET /api/auth/check - whether the request carries a valid magic-link session (ported from
// apps/web; the session is now verified against auth_tokens, see lib/auth/session.ts).

import { NextResponse, type NextRequest } from 'next/server';
import { getSignedInUser } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const user = await getSignedInUser(request);
    return NextResponse.json(
      user ? { isAuthenticated: true, email: user.email, userId: user.id } : { isAuthenticated: false }
    );
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
