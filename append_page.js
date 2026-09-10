const fs = require('fs');
const moreContent = `
      <section className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          <span className={styles.trustItem}>Educational, not diagnostic</span>
          <span className={styles.trustItem}>Deterministic scoring</span>
          <span className={styles.trustItem}>Governed AI explanation</span>
          <span className={styles.trustItem}>Private by design</span>
        </div>
      </section>

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

      <section className={styles.sevenDomains}>
        <div className={styles.sectionContainer}>
          <span className={styles.eyebrowGold}>SEVEN CONNECTED DOMAINS</span>
          <h2 className={styles.sectionTitle}>One biological intelligence framework</h2>
        </div>
        <div className={styles.lbisCenter}>
          <svg className={styles.lbisSvgLarge} viewBox="-280 -260 560 460">
            <circle cx="0" cy="0" r="86" fill="var(--zd-navy)" stroke="var(--zd-gold)" strokeWidth="2" />
          </svg>
        </div>
      </section>

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
              <p className={styles.stepDesc}>Approved responses are normalized.</p>
            </div>
            <div className={styles.stepArrow} />
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>Analyse</h3>
              <p className={styles.stepDesc}>Deterministic rules calculate domains and drivers.</p>
            </div>
            <div className={styles.stepArrow} />
            <div className={styles.stepItem}>
              <span className={styles.stepNumber}>04</span>
              <h3 className={styles.stepTitle}>Explain & Render</h3>
              <p className={styles.stepDesc}>Governed AI explains approved objects.</p>
            </div>
          </div>
        </div>
      </section>

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
            </div>
            <p className={styles.reportNote}>This is a questionnaire summary, not a medical risk probability.</p>
          </div>
        </div>
      </section>

      <section className={styles.pilot}>
        <div className={styles.sectionContainer}>
          <div className={styles.pilotCard}>
            <span className={styles.eyebrowTeal}>PILOT PROGRAM</span>
            <h2 className={styles.pilotTitle}>Join the ROOTS-AI™ Free Beta</h2>
            <p className={styles.pilotDescription}>
              The beta explores whether a structured, non-diagnostic assessment can help
              people understand self-reported patterns.
            </p>
            <Link href="/pilot" className={styles.btnNavy}>Check Eligibility</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
fs.appendFileSync('d:/SahilThakur/Drholly/my-nextjs-app/app/page.tsx', moreContent);
console.log('Appended remaining sections');
