'use client';

/**
 * Global header, zone PUB01-Z01.
 *
 * Navigation model: ROOTS written direction ("APPROVED HEADER MODEL", Holly, 10 Sep 2026)
 *   Desktop  logo/Home · How It Works · Platform · Example Report · Research · About · More · Start Your Assessment
 *   More     Healthcare Professionals · Pilot · Blog · Contact
 *   Mobile   logo/Home + menu control; the menu lists Home, the primary and More routes, then the CTA.
 *
 * Visual treatment from the v1.2 masters: 72px #1A2A4A band, approved dark-surface
 * wordmark (154 x 34, 145 x 32 at 360), 13px / 500 navigation, 182 x 44 gold action,
 * 44 x 36 outlined menu control. Breakpoints are CSS-only (no width detection in JS),
 * so the server and client render the same markup.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

type NavItem = { label: string; href: string };

const PRIMARY_NAV: NavItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Platform', href: '/platform' },
  { label: 'Example Report', href: '/example-report' },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
];

const MORE_NAV: NavItem[] = [
  { label: 'Healthcare Professionals', href: '/healthcare-professionals' },
  { label: 'Pilot', href: '/pilot' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/** Mobile menu order, exactly as directed. */
const DRAWER_NAV: NavItem[] = [{ label: 'Home', href: '/' }, ...PRIMARY_NAV, ...MORE_NAV];

const CTA: NavItem = { label: 'Start Your Assessment', href: '/assessment' };

/** Paths from the approved icon-menu.svg, inlined so the icon takes currentColor. */
function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <rect x="2" y="4" width="20" height="2" rx="1" fill="currentColor" />
      <rect x="2" y="11" width="20" height="2" rx="1" fill="currentColor" />
      <rect x="2" y="18" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

/** Paths from the approved icon-close.svg. */
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Wordmark() {
  // Header logo supplied in public/logo.png, cropped to its artwork and sized for the
  // 72px band (public/brand/roots-logo-header.png). The approved v1.2 wordmark is
  // still at /brand/ROOTS-wordmark-dark.svg if the approved asset is required.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/roots-logo-header.png" alt="ROOTS-AI™" className={styles.wordmark} />;
}

const FOCUSABLE = 'a[href], button:not([disabled]):not([tabindex="-1"])';

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`));
  const current = (href: string) => (isActive(href) ? 'page' : undefined);
  const moreActive = MORE_NAV.some((item) => isActive(item.href));

  // design_tokens.json header.stickyTrigger = 80px.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY >= 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close both menus on navigation.
  useEffect(() => {
    setDrawerOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // The drawer exists below 1024 only; close it if the viewport grows past that.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && setDrawerOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  // More menu: outside click and Escape close it; Escape returns focus to the button.
  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMoreOpen(false);
      moreButtonRef.current?.focus();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [moreOpen]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Drawer: focus moves in, Tab is trapped, Escape closes with focus return, page does not scroll.
  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <header className={styles.header} data-stuck={stuck} data-zone="PUB01-Z01">
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="ROOTS-AI™ home">
            <Wordmark />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                aria-current={current(item.href)}
              >
                {item.label}
              </Link>
            ))}

            <div className={styles.more} ref={moreRef}>
              <button
                ref={moreButtonRef}
                type="button"
                className={styles.moreButton}
                aria-expanded={moreOpen}
                aria-controls="more-menu"
                data-active={moreActive}
                onClick={() => setMoreOpen((open) => !open)}
              >
                More
              </button>
              {moreOpen && (
                <div id="more-menu" className={styles.moreMenu}>
                  {MORE_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.moreLink}
                      aria-current={current(item.href)}
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <Link href={CTA.href} className={styles.cta}>
            {CTA.label}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="site-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      <div
        id="site-drawer"
        ref={drawerRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!drawerOpen}
      >
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeDrawer}
        />
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <Wordmark />
            <button type="button" className={styles.menuButton} aria-label="Close menu" onClick={closeDrawer}>
              <IconClose />
            </button>
          </div>
          <nav className={styles.drawerNav} aria-label="Site">
            {DRAWER_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.drawerLink}
                aria-current={current(item.href)}
                onClick={closeDrawer}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={CTA.href} className={`${styles.cta} ${styles.drawerCta}`} onClick={closeDrawer}>
            {CTA.label}
          </Link>
        </div>
      </div>
    </>
  );
}
