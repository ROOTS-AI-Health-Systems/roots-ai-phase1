// Inner-page design copied from clonedwebsite/app/example-report/page.tsx; styles scoped in app/clone-pages.css.

const DOMAINS: [string, string][] = [
  ['Metabolic Wellness', 'Energy production and glucose regulation insights based on your assessment responses.'],
  ['Hormonal Balance', 'Comprehensive analysis of endocrine system patterns and regulatory state.'],
  ['Sleep Quality', 'Detailed assessment of sleep patterns, recovery, and regeneration capacity.'],
  ['Cellular Health', 'Cellular resilience and oxidative stress evaluation from your responses.'],
  ['Stress Resilience', 'Nervous system adaptability and stress response capacity analysis.'],
  ['Immune Function', 'Immune defense and inflammatory response patterns assessment.'],
];

export default function ExampleReportPage() {
  return (
    <div className="clone-page">
      <main id="main" className="marketing-page inner-page report-page">
      <section className="page-heading">
        <h1>Sample Report Overview</h1>
        <p>
          Your ROOTS-AI wellness report contains 19 detailed sections analyzing your biological
          profile across 7 key domains:
        </p>
      </section>
      <section className="domain-grid">
        {DOMAINS.map(([title, body]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="report-features">
        <h2>Report Features</h2>
        <p>
          Each report includes personalized recommendations, domain-specific insights, actionable
          wellness strategies, and comparative wellness scores to help you understand your unique
          biological profile.
        </p>
      </section>
    </main>
      </div>
  );
}
