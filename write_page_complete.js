const fs = require('fs');
const content = `// app/page.tsx
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main id="main" className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.heroEyebrow}>BIOLOGICAL INTELLIGENCE PLATFORM</span>
              <h1 className={styles.heroTitle}>
                Decode the Biology
                <br />
                Before You Fight the Weight
              </h1>
              <p className={styles.heroDescription}>
                ROOTS-AI™ turns a structured assessment into a governed
                biological intelligence report—helping you understand
                patterns in metabolism, hunger, sleep, circadian timing,
                stress, inflammation-related signals and perceived biological
                resistance.
              </p>
              <div className={styles.heroButtons}>
                <Link href="/assessment/start" className={styles.btnGold}>
                  Start Your Assessment
                </Link>
                <Link href="/example-report" className={styles.btnOutlineWhite}>
                  View Example Report
                </Link>
              </div>
            </div>
            <div className={styles.lbisHero}>
              <div className={styles.lbisCanvas}>
                <svg className={styles.lbisSvg} viewBox="-280 -260 560 460" xmlns="http://www.w3.org/2000/svg">
                  <path d="M -5 155 C -10 80 -4 30 0 -20 C 5 -80 55 -115 95 -165" fill="none" stroke="var(--zd-gold)" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
                  <path d="M -2 110 C -75 70 -130 20 -185 -70 M 0 80 C 70 45 135 10 185 -75 M 0 45 C -50 -15 -55 -85 -70 -175 M 5 35 C 65 -20 80 -95 90 -165 M 0 115 C -65 125 -95 145 -120 165 M 5 120 C 70 125 105 145 120 160" fill="none" stroke="var(--zd-teal)" strokeWidth="3" opacity="0.8" />
                  <circle cx="0" cy="0" r="86" fill="var(--zd-navy)" stroke="var(--zd-gold)" strokeWidth="2" />
                  <text x="0" y="-12" fill="var(--zd-white)" fontSize="14" fontWeight="600" textAnchor="middle">BIOLOGICAL</text>
                  <text x="0" y="12" fill="var(--zd-white)" fontSize="24" fontWeight="700" textAnchor="middle">STATE</text>
                  <text x="0" y="37" fill="var(--zd-gold)" fontSize="11" fontWeight="600" textAnchor="middle">61 / 100 · STRAINED</text>
                  <line x1="0" y1="0" x2="-190" y2="-110" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="-70" y2="-180" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="90" y2="-170" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="195" y2="-75" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="185" y2="80" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="70" y2="170" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <line x1="0" y1="0" x2="-105" y2="160" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
                  <circle cx="-190" cy="-110" r="31" fill="var(--zd-white)" stroke="var(--zd-teal)" strokeWidth="3" />
                  <text x="-190" y="-105" fill="var(--zd-teal)" fontSize="11" fontWeight="700" textAnchor="middle">ME</text>
                  <text x="-190" y="-62" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Metabolic</text>
                  <circle cx="-70" cy="-180" r="31" fill="var(--zd-white)" stroke="var(--zd-gold)" strokeWidth="3" />
                  <text x="-70" y="-175" fill="var(--zd-gold)" fontSize="11" fontWeight="700" textAnchor="middle">HU</text>
                  <text x="-70" y="-132" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Hunger</text>
                  <circle cx="90" cy="-170" r="31" fill="var(--zd-white)" stroke="var(--zd-navy)" strokeWidth="3" />
                  <text x="90" y="-165" fill="var(--zd-navy)" fontSize="11" fontWeight="700" textAnchor="middle">SL</text>
                  <text x="90" y="-122" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Sleep</text>
                  <circle cx="195" cy="-75" r="31" fill="var(--zd-white)" stroke="var(--zd-teal)" strokeWidth="3" />
                  <text x="195" y="-70" fill="var(--zd-teal)" fontSize="11" fontWeight="700" textAnchor="middle">CI</text>
                  <text x="195" y="-27" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Circadian</text>
                  <circle cx="185" cy="80" r="31" fill="var(--zd-white)" stroke="var(--zd-strained)" strokeWidth="3" />
                  <text x="185" y="85" fill="var(--zd-strained)" fontSize="11" fontWeight="700" textAnchor="middle">ST</text>
                  <text x="185" y="128" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Stress</text>
                  <circle cx="70" cy="170" r="31" fill="var(--zd-white)" stroke="var(--zd-gold)" strokeWidth="3" />
                  <text x="70" y="175" fill="var(--zd-gold)" fontSize="11" fontWeight="700" textAnchor="middle">IN</text>
                  <text x="70" y="218" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Inflammation</text>
                  <circle cx="-105" cy="160" r="31" fill="var(--zd-white)" stroke="#27AE60" strokeWidth="3" />
                  <text x="-105" y="165" fill="#27AE60" fontSize="11" fontWeight="700" textAnchor="middle">SA</text>
                  <text x="-105" y="208" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Safety</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <span className={styles.trustItem}>Educational, not diagnostic</span>
          <span className={styles.trustItem}>Deterministic scoring</span>
          <span className={styles.trustItem}>Governed AI explanation</span>
          <span className={styles.trustItem}>Private by design</span>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section className={styles.whatChanges}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrowTeal}>WHAT CHANGES</span>
          <h2 className={styles.sectionTitle}>A connected view of the patterns behind the struggle</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Beyond a number on the scale</h3>
              <p className={styles.featureDesc}>See the pattern behind the struggle.</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Seven biological domains</h3>
              <p className={styles.featureDesc}>One connected view.</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Deterministic scores</h3>
              <p className={styles.featureDesc}>AI assists with explanation, not calculation.</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Your report</h3>
              <p className={styles.featureDesc}>19 transparent sections with your answers and limitations.</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Private by design</h3>
              <p className={styles.featureDesc}>Controlled access, versioning and audit.</p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Educational, not diagnostic</h3>
              <p className={styles.featureDesc}>Designed to support informed conversations and realistic next steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEVEN CONNECTED DOMAINS */}
      <section className={styles.sevenDomains}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrowGold}>SEVEN CONNECTED DOMAINS</span>
          <h2 className={styles.sectionTitle}>One biological intelligence framework</h2>
        </div>
        <div className={styles.lbisCenter}>
          <svg className={styles.lbisSvgLarge} viewBox="-280 -260 560 460" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 155 C -10 80 -4 30 0 -20 C 5 -80 55 -115 95 -165" fill="none" stroke="var(--zd-gold)" strokeWidth="10" strokeLinecap="round" opacity="0.75" />
            <path d="M -2 110 C -75 70 -130 20 -185 -70 M 0 80 C 70 45 135 10 185 -75 M 0 45 C -50 -15 -55 -85 -70 -175 M 5 35 C 65 -20 80 -95 90 -165 M 0 115 C -65 125 -95 145 -120 165 M 5 120 C 70 125 105 145 120 160" fill="none" stroke="var(--zd-teal)" strokeWidth="3" opacity="0.8" />
            <circle cx="0" cy="0" r="86" fill="var(--zd-navy)" stroke="var(--zd-gold)" strokeWidth="2" />
            <text x="0" y="-12" fill="var(--zd-white)" fontSize="14" fontWeight="600" textAnchor="middle">BIOLOGICAL</text>
            <text x="0" y="12" fill="var(--zd-white)" fontSize="24" fontWeight="700" textAnchor="middle">STATE</text>
            <text x="0" y="37" fill="var(--zd-gold)" fontSize="11" fontWeight="600" textAnchor="middle">61 / 100 · STRAINED</text>
            <line x1="0" y1="0" x2="-190" y2="-110" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="-70" y2="-180" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="90" y2="-170" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="195" y2="-75" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="185" y2="80" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="70" y2="170" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <line x1="0" y1="0" x2="-105" y2="160" stroke="var(--zd-border)" strokeWidth="1" opacity="0.55" />
            <circle cx="-190" cy="-110" r="31" fill="var(--zd-white)" stroke="var(--zd-teal)" strokeWidth="3" />
            <text x="-190" y="-105" fill="var(--zd-teal)" fontSize="11" fontWeight="700" textAnchor="middle">ME</text>
            <text x="-190" y="-62" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Metabolic</text>
            <circle cx="-70" cy="-180" r="31" fill="var(--zd-white)" stroke="var(--zd-gold)" strokeWidth="3" />
            <text x="-70" y="-175" fill="var(--zd-gold)" fontSize="11" fontWeight="700" textAnchor="middle">HU</text>
            <text x="-70" y="-132" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Hunger</text>
            <circle cx="90" cy="-170" r="31" fill="var(--zd-white)" stroke="var(--zd-navy)" strokeWidth="3" />
            <text x="90" y="-165" fill="var(--zd-navy)" fontSize="11" fontWeight="700" textAnchor="middle">SL</text>
            <text x="90" y="-122" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Sleep</text>
            <circle cx="195" cy="-75" r="31" fill="var(--zd-white)" stroke="var(--zd-teal)" strokeWidth="3" />
            <text x="195" y="-70" fill="var(--zd-teal)" fontSize="11" fontWeight="700" textAnchor="middle">CI</text>
            <text x="195" y="-27" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Circadian</text>
            <circle cx="185" cy="80" r="31" fill="var(--zd-white)" stroke="var(--zd-strained)" strokeWidth="3" />
            <text x="185" y="85" fill="var(--zd-strained)" fontSize="11" fontWeight="700" textAnchor="middle">ST</text>
            <text x="185" y="128" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Stress</text>
            <circle cx="70" cy="170" r="31" fill="var(--zd-white)" stroke="var(--zd-gold)" strokeWidth="3" />
            <text x="70" y="175" fill="var(--zd-gold)" fontSize="11" fontWeight="700" textAnchor="middle">IN</text>
            <text x="70" y="218" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Inflammation</text>
            <circle cx="-105" cy="160" r="31" fill="var(--zd-white)" stroke="#27AE60" strokeWidth="3" />
            <text x="-105" y="165" fill="#27AE60" fontSize="11" fontWeight="700" textAnchor="middle">SA</text>
            <text x="-105" y="208" fill="var(--zd-navy)" fontSize="10" fontWeight="600" textAnchor="middle">Safety</text>
          </svg>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrowTeal}>HOW IT WORKS</span>
          <h2 className={styles.sectionTitle}>From structured answers to governed explanation</h2>
          <div className={styles.stepsRow}>
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>01</span>
              <h3 className={styles.stepTitle}>Assess</h3>
              <p className={styles.stepDesc}>Complete the structured 73-question assessment.</p>
            </div>
            <div className={styles.stepArrow} />
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>02</span>
              <h3 className={styles.stepTitle}>Validate</h3>
              <p className={styles.stepDesc}>Approved responses are normalized; Not Applicable remains preserved.</p>
            </div>
            <div className={styles.stepArrow} />
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>Analyse</h3>
              <p className={styles.stepDesc}>Deterministic rules calculate domains, drivers, confidence and eligible content.</p>
            </div>
            <div className={styles.stepArrow} />
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>04</span>
              <h3 className={styles.stepTitle}>Explain & Render</h3>
              <p className={styles.stepDesc}>Governed AI explains approved objects; web and PDF use the same immutable report.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE REPORT */}
      <section className={styles.exampleReport}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrowGold}>EXAMPLE REPORT</span>
          <h2 className={styles.sectionTitle}>See the state, drivers and boundaries clearly</h2>
          <div className={styles.reportCard}>
            <div className={styles.reportCardInner}>
              <div className={styles.reportStateBlock}>
                <span className={styles.reportLabel}>BIOLOGICAL STATE</span>
                <div className={styles.reportScore}>
                  <span className={styles.reportScoreNum}>61</span>
                  <span className={styles.reportScoreDenom}>/100</span>
                </div>
                <span className={styles.reportStatus}>STRAINED</span>
              </div>
              <div className={styles.reportDrivers}>
                <div className={styles.driverBlock}>
                  <span className={styles.driverLabel}>Stress Load</span>
                  <span className={styles.driverValue} style={{ color: 'var(--zd-strained)' }}>75</span>
                  <div className={styles.driverBarTrack}>
                    <div className={styles.driverBarFill} style={{ width: '75%', background: 'var(--zd-strained)' }} />
                  </div>
                </div>
                <div className={styles.driverBlock}>
                  <span className={styles.driverLabel}>Sleep Recovery</span>
                  <span className={styles.driverValue} style={{ color: 'var(--zd-teal)' }}>68</span>
                  <div className={styles.driverBarTrack}>
                    <div className={styles.driverBarFill} style={{ width: '68%', background: 'var(--zd-teal)' }} />
                  </div>
                </div>
                <div className={styles.driverBlock}>
                  <span className={styles.driverLabel}>Metabolic Resistance</span>
                  <span className={styles.driverValue} style={{ color: 'var(--zd-gold)' }}>62</span>
                  <div className={styles.driverBarTrack}>
                    <div className={styles.driverBarFill} style={{ width: '62%', background: 'var(--zd-gold)' }} />
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.reportNote}>This is a questionnaire summary, not a medical risk probability.</p>
          </div>
        </div>
      </section>

      {/* PILOT */}
      <section className={styles.pilot}>
        <div className={styles.sectionContainer}>
          <div className={styles.pilotCard}>
            <span className={styles.eyebrowTeal}>PILOT PROGRAM</span>
            <h2 className={styles.pilotTitle}>Join the ROOTS-AI™ Free Beta</h2>
            <p className={styles.pilotDescription}>
              The beta explores whether a structured, non-diagnostic assessment can help
              people understand self-reported patterns involving weight resistance,
              energy, sleep, stress and appetite.
            </p>
            <Link href="/pilot" className={styles.btnNavy}>Check Eligibility</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
fs.writeFileSync('d:/SahilThakur/Drholly/my-nextjs-app/app/page.tsx', content);
console.log('page.tsx recreated successfully');
