/**
 * Signed-in user, from the magic-link session.
 *
 * /api/auth/verify-token stores the one-time token in the httpOnly auth_token cookie once it
 * is used. apps/web's /api/auth/check trusted the readable user_id / auth_email cookies
 * whenever that cookie merely existed; here the token is looked up in auth_tokens, so a
 * hand-edited cookie signs nobody in.
 */

import type { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { AuthError } from '@/lib/utils/errors';

export const AUTH_COOKIE = 'auth_token';

/** Seven days, as in apps/web. */
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

export interface SignedInUser {
  id: string;
  email: string;
  name?: string | null;
}

export function sessionCookieOptions(httpOnly: boolean) {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  };
}

export async function getSignedInUser(request: NextRequest): Promise<SignedInUser | null> {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  const supabase = getSupabaseAdmin();
  const { data: authToken, error: tokenError } = await supabase
    .from('auth_tokens')
    .select('user_id, used_at')
    .eq('token', token)
    .eq('token_type', 'magic_link')
    .maybeSingle();
  if (tokenError) throw tokenError;

  // A session exists only for a verified token, and lasts as long as the cookie.
  if (!authToken?.used_at) return null;
  if (Date.now() - new Date(authToken.used_at).getTime() > SESSION_MAX_AGE * 1000) return null;

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('id', authToken.user_id)
    .maybeSingle();
  if (userError) throw userError;

  return user ?? null;
}

export async function requireUser(request: NextRequest): Promise<SignedInUser> {
  const user = await getSignedInUser(request);
  if (!user) throw new AuthError('Sign in to continue');
  return user;
}
