'use client';

/**
 * Global footer, zone PUB01-Z09.
 *
 * Authority: PUB-01_1440_MASTER_CORRECTED_FINAL.svg / PUB-01_360_MASTER_CORRECTED_FINAL.svg
 * (v1.2.1, approved C-04/C-05 global public footer): wordmark, the Product / Company /
 * Legal groups, a divider, the boundary statement and the approved copyright.
 * Centred at 360, left-aligned columns on desktop. Colours are tokens only.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Product',
    links: [
      ['Assessment', '/assessment'],
      ['Example Report', '/example-report'],
      ['How It Works', '/how-it-works'],
      ['Platform', '/platform'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Research', '/research'],
      ['Healthcare Professionals', '/healthcare-professionals'],
      ['Pilot Program', '/pilot'],
      ['Contact', '/contact'],
      ['Blog', '/blog'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Cookies', '/cookies'],
      ['Medical Disclaimer', '/medical-disclaimer'],
      ['AI Disclaimer', '/ai-disclaimer'],
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const current = (href: string) =>
    pathname === href || (href === '/blog' && pathname?.startsWith('/blog/')) ? 'page' : undefined;

  return (
    <footer className={styles.footer} data-zone="PUB01-Z09">
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="ROOTS-AI™ home">
          {/* Approved asset, served byte-identical from public/brand. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ROOTS-wordmark-dark.svg" alt="ROOTS-AI™" className={styles.wordmark} />
        </Link>

        <nav className={styles.columns} aria-label="Footer">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.list}>
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className={styles.link} aria-current={current(href)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.legal}>
          <p className={styles.disclaimer}>
            ROOTS-AI™ provides educational wellness information and does not diagnose or treat medical
            conditions.
          </p>
          {/* Wraps naturally: at the 16px legal size the master's forced break left "Inc." alone. */}
          <p className={styles.copyright}>© 2026 ROOTS AI HEALTH SYSTEMS, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
