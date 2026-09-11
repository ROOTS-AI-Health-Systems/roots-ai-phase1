// POST /api/auth/logout - clears the session cookies (ported from apps/web).

import { NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth/session';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.delete(AUTH_COOKIE);
  response.cookies.delete('auth_email');
  response.cookies.delete('user_id');
  return response;
}
