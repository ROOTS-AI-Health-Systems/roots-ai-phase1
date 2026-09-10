// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './zd-tokens.css';
import './clone-pages.css';
import './inner-pages-home-type.css';
import SiteChrome from '@/components/SiteChrome';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ROOTS-AI™ - Decode the Biology Before You Fight the Weight',
  description: 'ROOTS-AI™ turns a structured assessment into a governed biological intelligence report.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // data-scroll-behavior: Next.js 16 opt-in so page changes jump to the top instantly
    // instead of animating with the global smooth scroll.
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}