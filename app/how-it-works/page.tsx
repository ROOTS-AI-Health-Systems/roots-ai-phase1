// Inner-page design copied from clonedwebsite/app/how-it-works/page.tsx; styles scoped in app/clone-pages.css.

import Link from 'next/link';

const STEPS: [string, string, string][] = [
  ['01', 'Assessment', 'Answer a structured set of questions about your biological context and lived experience.'],
  ['02', 'Validation', 'Approved rules normalize responses and preserve uncertainty rather than filling gaps.'],
  ['03', 'Interpretation', 'The ROOTS-AI engine organizes signals into domains, drivers, and derived indicators.'],
  ['04', 'Report', 'Receive clear language, confidence notes, and next-step context in an immutable report.'],
];

export default function HowItWorksPage() {
  return (
    <div className="clone-page">
      <main id="main" className="marketing-page inner-page">
      <section className="page-heading">
        <p className="marketing-kicker">THE ROOTS-AI METHOD</p>
        <h1>How It Works</h1>
        <p>
          Every layer is designed to make complex biological context easier to understand, without
          overstating what the data can tell us.
        </p>
      </section>
      <section className="steps-grid">
        {STEPS.map(([num, title, body]) => (
          <article key={num}>
            <span>{num}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="principle-strip">
        <strong>✓ AI assists with language generation only.</strong>
        <strong>AI does not diagnose, prescribe, change scores, or invent participant facts.</strong>
      </section>
      <div className="center-actions">
        <Link href="/assessment" className="primary-button">
          Start Your Assessment
        </Link>
        <Link href="/example-report" className="secondary-button">
          View Example Report
        </Link>
      </div>
    </main>
      </div>
  );
}
