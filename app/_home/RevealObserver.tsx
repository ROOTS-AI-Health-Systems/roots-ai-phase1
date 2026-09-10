'use client';

/**
 * Scroll reveal for PUB-01 sections: 250ms, the top of the approved motion window.
 *
 * The server renders every block visible. After hydration, only blocks still
 * below the fold are armed (hidden) and then revealed as they enter the
 * viewport. Nothing is ever hidden without JavaScript, and nothing above the
 * fold flashes. Skipped entirely under prefers-reduced-motion.
 */

import { useEffect } from 'react';

export default function RevealObserver() {
  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (el) =>
        el.dataset.reveal !== 'shown' &&
        el.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = 'shown';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    for (const el of pending) {
      el.dataset.reveal = 'armed';
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
