// app/contact/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [referenceId, setReferenceId] = useState('REF-2026-001');

  useEffect(() => {
    // In a real app, this would come from the URL params or API
    const ref = searchParams.get('ref');
    if (ref) {
      setReferenceId(ref);
    } else {
      // Generate a random reference ID for demo purposes
      const randomId = `REF-${Date.now().toString().slice(-6)}`;
      setReferenceId(randomId);
    }
  }, [searchParams]);

  return (
    <>
      {/* Success Section */}
      <section className={styles.success}>
        <div className={styles.successInner}>
          <div className={styles.checkmarkCircle}>
            <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className={styles.eyebrow}>ENQUIRY RECEIVED</span>
          <h1 className={styles.successTitle}>
            Thank you. Your enquiry has been received. We will respond through the
            contact details you provided.
          </h1>

          <div className={styles.referenceBox}>
            <span className={styles.referenceLabel}>Reference ID</span>
            <div className={styles.referenceId}>
              <span className={styles.monoText}>{referenceId}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className={styles.nextSteps}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrow}>NEXT STEPS</span>
          <h2 className={styles.sectionTitle}>What happens next</h2>
          <p className={styles.nextStepsDescription}>
            We will respond through the contact details you provided.
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className={styles.actions}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrow}>ACTIONS</span>
          <h2 className={styles.sectionTitle}>Continue</h2>
          <div className={styles.actionButtons}>
            <Link href="/" className={styles.btnPrimary}>
              Return Home
            </Link>
            <Link href="/contact" className={styles.btnOutline}>
              Send another inquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Loading fallback for Suspense
function SuccessLoading() {
  return (
    <section className={styles.success}>
      <div className={styles.successInner}>
        <div className={styles.checkmarkCircle}>
          <svg className={styles.checkmark} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={styles.eyebrow}>ENQUIRY RECEIVED</span>
        <h1 className={styles.successTitle}>
          Loading your confirmation...
        </h1>
      </div>
    </section>
  );
}

export default function ContactSuccess() {
  return (
    <main id="main" className={styles.main}>
      <Suspense fallback={<SuccessLoading />}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}