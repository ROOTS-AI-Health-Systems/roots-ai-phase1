/**
 * POST /api/auth/send-magic-link { email }
 *
 * Ported from apps/web (the sign-in flow tested on 8 Sep 2026): find or create the user,
 * store a one-time token in auth_tokens (MAGIC_LINK_EXPIRY_MINUTES, default 15) and log the
 * link, since no email service is connected yet.
 *
 * Demo mode (ROOTS direction, 11 Sep 2026): with MAGIC_LINK_DEMO_MODE=true the link is also
 * returned to the browser, which follows it at once, so sign-in works on the live site without
 * email. Anyone can then sign in as any address. Turn it off once emails are sent.
 */

import crypto from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { getClientIp } from '@/lib/api/request';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { validateEmail } from '@/lib/utils/validators';

const EXPIRY_MINUTES = Number(process.env.MAGIC_LINK_EXPIRY_MINUTES) || 15;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing, error: lookupError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    if (lookupError) throw lookupError;

    let userId: string | undefined = existing?.id;
    if (!userId) {
      const { data: created, error: createError } = await supabase
        .from('users')
        .insert({ id: crypto.randomUUID(), email, name: email.split('@')[0] })
        .select('id')
        .single();

      if (createError || !created) {
        console.error('Error creating user:', createError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }
      userId = created.id;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const ip = getClientIp(request);

    const { error: tokenError } = await supabase.from('auth_tokens').insert({
      user_id: userId,
      token,
      token_type: 'magic_link',
      expires_at: new Date(Date.now() + EXPIRY_MINUTES * 60_000).toISOString(),
      user_agent: request.headers.get('user-agent'),
      ...(ip ? { ip_address: ip } : {}),
    });

    if (tokenError) {
      console.error('Error storing magic link token:', tokenError);
      return NextResponse.json({ error: 'Failed to generate magic link' }, { status: 500 });
    }

    const magicLink = `${request.nextUrl.origin}/auth/verify?token=${token}`;
    console.log(`\n🔗 MAGIC LINK EMAIL:\nTo: ${email}\n\nClick here to sign in:\n${magicLink}\n`);

    const demoMode = process.env.MAGIC_LINK_DEMO_MODE === 'true';
    return NextResponse.json({
      message: 'Magic link sent to your email',
      ...(demoMode ? { magicLink } : {}),
    });
  } catch (error) {
    console.error('Error sending magic link:', error);
    return NextResponse.json({ error: 'Failed to send magic link' }, { status: 500 });
  }
}
