/**
 * Server-side Supabase client (service role), for Route Handlers only.
 *
 * Ported from apps/web/src/lib/supabase/server.ts and apps/web/src/lib/supabase.ts, which
 * built this same client twice. Without credentials it returns a stand-in that throws on
 * first use and names the missing variables, so `next build` can import every route module
 * without them instead of failing later as an opaque 500.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function unconfiguredClient(missing: string[]): SupabaseClient {
  const fail = (): never => {
    throw new Error(
      `Supabase is not configured. Missing: ${missing.join(', ')}. ` +
        'Set these in .env.local (local) or the Vercel project settings (live) and redeploy.'
    );
  };

  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      // Let promise and serialisation probes answer falsy rather than throw, so the failure
      // happens at the call site and not inside a framework internal inspecting the object.
      if (typeof prop === 'symbol' || prop === 'then' || prop === 'toJSON') return undefined;
      return fail();
    },
  });
}

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const required: [string, string | undefined][] = [
    ['NEXT_PUBLIC_SUPABASE_URL', url],
    ['SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey],
  ];
  const missing = required.filter(([, value]) => !value).map(([name]) => name);

  if (missing.length) {
    console.error(`Supabase admin client unavailable. Missing: ${missing.join(', ')}`);
    return unconfiguredClient(missing);
  }

  client = createClient(url!, serviceRoleKey!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return client;
}
