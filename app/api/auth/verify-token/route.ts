/**
 * POST /api/auth/verify-token { token }
 *
 * Ported from apps/web: checks the magic-link token (exists, not expired, not used), marks it
 * used, records the login and sets the session cookies (auth_token httpOnly; auth_email and
 * user_id readable, as before). Marking the token used is conditional on it still being
 * unused, so two tabs opening the same link cannot both sign in.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE, sessionCookieOptions } from '@/lib/auth/session';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const TOKEN_FORMAT = /^[0-9a-f]{64}$/i;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === 'string' ? body.token : '';

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    if (!TOKEN_FORMAT.test(token)) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: authToken, error: tokenError } = await supabase
      .from('auth_tokens')
      .select('id, user_id, expires_at, used_at')
      .eq('token', token)
      .eq('token_type', 'magic_link')
      .maybeSingle();

    if (tokenError) throw tokenError;
    if (!authToken) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    if (new Date(authToken.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
    }
    if (authToken.used_at) {
      return NextResponse.json({ error: 'Token has already been used' }, { status: 401 });
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('id', authToken.user_id)
      .maybeSingle();

    if (userError) throw userError;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: claimed, error: claimError } = await supabase
      .from('auth_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', authToken.id)
      .is('used_at', null)
      .select('id');

    if (claimError) throw claimError;
    if (!claimed?.length) {
      return NextResponse.json({ error: 'Token has already been used' }, { status: 401 });
    }

    const { error: loginError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);
    if (loginError) console.warn(`Could not record last_login: ${loginError.message}`);

    const response = NextResponse.json({
      message: 'Token verified successfully',
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set(AUTH_COOKIE, token, sessionCookieOptions(true));
    response.cookies.set('auth_email', user.email, sessionCookieOptions(false));
    response.cookies.set('user_id', user.id, sessionCookieOptions(false));

    return response;
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
  }
}
