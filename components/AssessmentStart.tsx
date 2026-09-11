'use client';

// Inner-page design copied from clonedwebsite/components/AssessmentStart.tsx; styles scoped in app/clone-pages.css.
//
// The email starts magic-link sign-in (POST /api/auth/send-magic-link, ported from apps/web).
// In demo mode the link comes back in the response and is followed at once; otherwise the
// person is asked to check their inbox. If the backend is unreachable (for example Supabase is
// not configured), the assessment still runs, with answers kept in this browser only.

import { useState, type FormEvent } from 'react';
import { MODULES } from '@/lib/roots/assessment';

/** Shared by /assessment and /assessment/start. */
export default function AssessmentStart() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body?.error ?? `Sign-in failed (${response.status})`);

      if (typeof body?.magicLink === 'string') {
        window.location.assign(body.magicLink);
        return;
      }
      setStatus('sent');
    } catch (error) {
      console.error('Sign-in unavailable; continuing without saving to the server:', error);
      window.location.assign(`/assessment/${crypto.randomUUID()}/module/${MODULES[0].id}`);
    }
  }

  return (
    <div className="clone-page">
      <main id="main" className="route-shell">
      <p className="eyebrow">ROOTS / ASSESSMENT</p>
      <h1>Begin your growth map.</h1>
      <p className="route-lede">
        {status === 'sent'
          ? `Check ${email} for your sign-in link.`
          : 'Enter your email to save your progress and return to your assessment.'}
      </p>
      <form className="route-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <button className="continue-button" type="submit" disabled={status === 'sending'}>
          Start assessment →
        </button>
      </form>
    </main>
      </div>
  );
}
