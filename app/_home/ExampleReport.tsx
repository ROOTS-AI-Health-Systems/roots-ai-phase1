'use client';

/**
 * Z07 example report card: Loaded, Loading and Error states (contract Z07,
 * acceptance checklist). Loaded is the master composition. Loading shows no
 * score, and Error renders no sample values at all, so neither can expose stale
 * or invented data. The card keeps its size in every state, so there is no
 * layout shift.
 *
 * Review hook: add ?report=loading or ?report=error to the URL to render that
 * state for Golden Screen evidence. Retry runs a real loading pass.
 */

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from '../page.module.css';
import { REPORT, REPORT_STATES } from './content';

type Status = 'loaded' | 'loading' | 'error';

const RETRY_MS = 600;

export default function ExampleReport() {
  const [status, setStatus] = useState<Status>('loaded');
  const retryTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('report');
    if (requested === 'loading' || requested === 'error') setStatus(requested);
    return () => window.clearTimeout(retryTimer.current);
  }, []);

  const retry = () => {
    setStatus('loading');
    window.clearTimeout(retryTimer.current);
    retryTimer.current = window.setTimeout(() => setStatus('loaded'), RETRY_MS);
  };

  return (
    <div className={styles.reportCard} data-state={status} aria-busy={status === 'loading'}>
      {status === 'loaded' && (
        <div key="loaded" className={`${styles.reportLoaded} ${styles.stateEnter}`}>
          <div className={styles.reportBody}>
            <div>
              <p className={styles.reportLabel}>{REPORT.stateLabel}</p>
              <p className={styles.reportScore}>
                <span className={styles.reportScoreNum}>{REPORT.score}</span>
                <span className={styles.reportScoreDenom}>{REPORT.scoreOutOf}</span>
              </p>
              <p className={styles.reportStatus}>{REPORT.status}</p>
            </div>

            <ul className={styles.metrics}>
              {REPORT.metrics.map((m, i) => (
                <li key={m.label} className={styles.metric}>
                  <span className={styles.metricLabel}>{m.label}</span>
                  <span className={styles.metricValue} style={{ color: m.color }}>
                    {m.value}
                  </span>
                  <span
                    className={styles.metricTrack}
                    role="img"
                    aria-label={`${m.label}: ${m.value} out of 100`}
                  >
                    <span
                      className={styles.metricFill}
                      style={{ width: `${m.value}%`, background: m.color, '--i': i } as CSSProperties}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.reportNote}>{REPORT.note}</p>
        </div>
      )}

      {status === 'loading' && (
        <div key="loading" className={`${styles.reportMessage} ${styles.stateEnter}`} role="status">
          <p className={styles.reportMessageTitle}>{REPORT_STATES.loading.title}</p>
          <p className={styles.reportMessageBody}>{REPORT_STATES.loading.body}</p>
        </div>
      )}

      {status === 'error' && (
        <div key="error" className={`${styles.reportMessage} ${styles.stateEnter}`} role="alert">
          <p className={styles.reportMessageTitle}>{REPORT_STATES.error.title}</p>
          <p className={styles.reportMessageBody}>{REPORT_STATES.error.body}</p>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnRetry}`}
            onClick={retry}
          >
            {REPORT_STATES.error.retry}
          </button>
        </div>
      )}
    </div>
  );
}
