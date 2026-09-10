const fs = require('fs');
const content = `// app/page.tsx
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main id="main" className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.heroEyebrow}>BIOLOGICAL INTELLIGENCE PLATFORM</span>
              <h1 className={styles.heroTitle}>
                Decode the Biology<br />
                Before You Fight the Weight
              </h1>
              <p className={styles.heroDescription}>
                ROOTS-AI™ turns a structured assessment into a governed
                biological intelligence report.
              </p>
              <div className={styles.heroButtons}>
                <Link href="/assessment/start" className={styles.btnGold}>Start</Link>
                <Link href="/example-report" className={styles.btnOutlineWhite}>View</Link>
              </div>
            </div>
            <div className={styles.lbisHero}>
              <div className={styles.lbisCanvas}>
                <svg className={styles.lbisSvg} viewBox="-280 -260 560 460">
                  <circle cx="0" cy="0" r="86" fill="var(--zd-navy)" stroke="var(--zd-gold)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
`;
fs.writeFileSync('d:/SahilThakur/Drholly/my-nextjs-app/app/page.tsx', content);
console.log('Done');
