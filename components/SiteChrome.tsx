/**
 * Wraps every page with the global header (PUB01-Z01) and footer (PUB01-Z09).
 */

import Header from './Header';
import Footer from './Footer';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
