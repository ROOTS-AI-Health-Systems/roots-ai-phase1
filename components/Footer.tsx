'use client';

/**
 * Global footer, zone PUB01-Z09.
 *
 * Composition from the masters: navy band, approved dark-surface wordmark,
 * disclaimer, copyright. Link groups keep the order agreed with ROOTS
 * (Product · Research · Company · Legal) and reach every approved public and
 * legal route plus the Start Your Assessment action (contract Z09).
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Product',
    links: [
      ['How It Works', '/how-it-works'],
      ['Platform', '/platform'],
      ['Example Report', '/example-report'],
      ['Start Your Assessment', '/assessment'],
    ],
  },
  {
    title: 'Research',
    links: [
      ['Research', '/research'],
      ['Pilot Program', '/pilot'],
      ['Healthcare Professionals', '/healthcare-professionals'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
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

        <p className={styles.disclaimer}>
          ROOTS-AI™ provides educational wellness information and does not diagnose or treat medical
          conditions.
        </p>

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

        <p className={styles.copyright}>© 2026 ROOTS AI HEALTH SYSTEMS, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
