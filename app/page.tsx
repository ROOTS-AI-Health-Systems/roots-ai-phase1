/**
 * PUB-01 · Home.
 *
 * Visual authority: ROOTS-AI Design Implementation Single Source v1.2, i.e.
 * PUB-01_1440_MASTER.svg and PUB-01_360_MASTER.svg. Copy comes from
 * PUB-01_CONTENT_FUNCTION_CONTRACT.md through ./_home/content.ts. 768 and 1024
 * follow PUB-01_RESPONSIVE_RULES_768_1024.md and stay provisional until the
 * 1440 + 360 Golden Screens are approved in writing.
 *
 * Header (Z01) and footer (Z09) are rendered by the root layout's SiteChrome.
 */

import type { CSSProperties } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import ExampleReport from './_home/ExampleReport';
import LivingSystem from './_home/LivingSystem';
import RevealObserver from './_home/RevealObserver';
import {
  DOMAINS_HEADING,
  FEATURES,
  FEATURES_HEADING,
  HERO,
  HOW_HEADING,
  PILOT,
  REPORT,
  REPORT_HEADING,
  REPORT_STATES,
  STEPS,
  TRUST,
} from './_home/content';

export default function Home() {
  return (
    <main id="main" className={styles.main}>
      <RevealObserver />

      {/* Z02 · Hero */}
      <section className={styles.hero} data-zone="PUB01-Z02" aria-labelledby="hero-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>{HERO.eyebrow}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {HERO.headline[0]}
              <br />
              {HERO.headline[1]}{' '}
              <br className={styles.brMobile} />
              {HERO.headline[2]}
            </h1>
            <p className={styles.heroBody}>{HERO.body}</p>
          </div>

          <div className={styles.heroActions}>
            <Link
              href={HERO.primaryCta.href}
              className={`${styles.btn} ${styles.btnGold} ${styles.heroPrimary}`}
            >
              {HERO.primaryCta.label}
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className={`${styles.btn} ${styles.btnOutline} ${styles.heroSecondary}`}
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>

          <div className={styles.heroSystem}>
            <LivingSystem wake="load" />
          </div>
        </div>
      </section>

      {/* Z03 · Trust strip */}
      <section className={styles.trust} data-zone="PUB01-Z03" aria-label="ROOTS-AI principles">
        <ul className={`${styles.container} ${styles.trustList}`}>
          {TRUST.map((item) => (
            <li key={item} className={styles.trustItem}>
              <span className={styles.trustCheck} aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Z04 · Six features */}
      <section className={styles.features} data-zone="PUB01-Z04" aria-labelledby="features-title">
        <div className={`${styles.container} ${styles.reveal}`} data-reveal="">
          <p className={`${styles.eyebrow} ${styles.eyebrowTeal}`}>{FEATURES_HEADING.eyebrow}</p>
          <h2 id="features-title" className={`${styles.title} ${styles.titleFeatures}`}>
            {FEATURES_HEADING.title}
          </h2>
          <ul className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <li key={f.title} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Z05 · Seven domains: one connected system, never seven cards */}
      <section className={styles.domains} data-zone="PUB01-Z05" aria-labelledby="domains-title">
        <div className={`${styles.container} ${styles.reveal}`} data-reveal="">
          <p className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{DOMAINS_HEADING.eyebrow}</p>
          <h2 id="domains-title" className={`${styles.title} ${styles.titleDomains}`}>
            {DOMAINS_HEADING.title}
          </h2>
          <div className={styles.domainsSystem}>
            <LivingSystem wake="view" />
          </div>
        </div>
      </section>

      {/* Z06 · How it works */}
      <section className={styles.how} data-zone="PUB01-Z06" aria-labelledby="how-title">
        <div className={`${styles.container} ${styles.reveal}`} data-reveal="">
          <p className={`${styles.eyebrow} ${styles.eyebrowTeal}`}>{HOW_HEADING.eyebrow}</p>
          <h2 id="how-title" className={`${styles.title} ${styles.titleHow}`}>
            {HOW_HEADING.title}
          </h2>
          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <li key={step.num} className={styles.step}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                {i < STEPS.length - 1 && (
                  <span
                    className={styles.stepConnector}
                    aria-hidden="true"
                    style={{ '--i': i } as CSSProperties}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Z07 · Example report teaser */}
      <section className={styles.report} data-zone="PUB01-Z07" aria-labelledby="report-title">
        <div className={`${styles.container} ${styles.reveal}`} data-reveal="">
          <p className={`${styles.eyebrow} ${styles.eyebrowGold}`}>{REPORT_HEADING.eyebrow}</p>
          <h2 id="report-title" className={`${styles.title} ${styles.titleReport}`}>
            {REPORT_HEADING.title}
          </h2>
          {/* Governed intro sentence and action (contract Z07). */}
          <p className={styles.reportIntro}>{REPORT_HEADING.body}</p>
          <Link
            href={REPORT_HEADING.cta.href}
            className={`${styles.btn} ${styles.btnNavy} ${styles.reportAction}`}
          >
            {REPORT_HEADING.cta.label}
          </Link>
          <ExampleReport />
        </div>
      </section>

      {/* Z08 · Pilot CTA */}
      <section className={styles.pilot} data-zone="PUB01-Z08" aria-labelledby="pilot-title">
        <div className={`${styles.container} ${styles.reveal}`} data-reveal="">
          <div className={styles.pilotCard}>
            <p className={`${styles.eyebrow} ${styles.eyebrowTeal}`}>{PILOT.eyebrow}</p>
            <h2 id="pilot-title" className={`${styles.title} ${styles.titlePilot}`}>
              {PILOT.title[0]}{' '}
              <br className={styles.brMobile} />
              {PILOT.title[1]}
            </h2>
            <p className={styles.pilotBody}>{PILOT.body}</p>
            {/* Governed eligibility and boundary statements (contract Z08). */}
            <ul className={styles.pilotStatements}>
              {PILOT.statements.map((statement) => (
                <li key={statement}>{statement}</li>
              ))}
            </ul>
            <Link
              href={PILOT.cta.href}
              className={`${styles.btn} ${styles.btnNavy} ${styles.pilotCta}`}
            >
              {PILOT.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
