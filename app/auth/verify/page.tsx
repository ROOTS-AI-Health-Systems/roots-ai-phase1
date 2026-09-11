'use client';

/**
 * Magic-link landing page (ported from apps/web/src/app/auth/verify/page.tsx).
 *
 * Verifies the token, starts an assessment session and continues to the first module. Uses
 * the existing inner-page styles (app/clone-pages.css); no new visual design.
 */

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { MODULES } from '@/lib/roots/assessment';

function Shell({ failed }: { failed: boolean }) {
  return (
    <div className="clone-page">
      <main id="main" className="route-shell">
        <p className="eyebrow">ROOTS / ASSESSMENT</p>
        {failed ? (
          <>
            <h1>This link can’t be used.</h1>
            <p className="route-lede">
              It may have expired or already been used. <Link href="/assessment">Request a new link</Link>.
            </p>
          </>
        ) : (
          <>
            <h1>Signing you in…</h1>
            <p className="route-lede">Checking your link and preparing your assessment.</p>
          </>
        )}
      </main>
    </div>
  );
}

function Verify() {
  const searchParams = useSearchParams();
  const [failed, setFailed] = useState(false);
  // A token works once; React runs effects twice in development, so verify only once.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const token = searchParams.get('token');

    (async () => {
      try {
        if (!token) throw new Error('No token provided');

        const verified = await fetch('/api/auth/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
          credentials: 'include',
        });
        if (!verified.ok) throw new Error(`Token verification failed (${verified.status})`);

        const created = await fetch('/api/assessments/sessions', { method: 'POST', credentials: 'include' });
        const body = await created.json().catch(() => ({}));
        if (!created.ok || !body?.data?.id) throw new Error(`Could not start a session (${created.status})`);

        window.location.assign(`/assessment/${body.data.id}/module/${MODULES[0].id}`);
      } catch (error) {
        console.error('Verification error:', error);
        setFailed(true);
      }
    })();
  }, [searchParams]);

  return <Shell failed={failed} />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<Shell failed={false} />}>
      <Verify />
    </Suspense>
  );
}
