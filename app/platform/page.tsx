// Inner-page design copied from clonedwebsite/app/platform/page.tsx; styles scoped in app/clone-pages.css.

const AVAILABLE: [string, string][] = [
  ['Assessment', 'Structured assessment experience.'],
  ['AI Engine', 'Governed report engine.'],
];

const COMING: [string, string][] = [
  ['Labs', 'Coming Soon: Laboratory data integration.'],
  ['DNA', 'Coming Soon: DNA and epigenetic insights.'],
  ['Microbiome', 'Coming Soon: Microbiome analysis.'],
  ['Wearables', 'Coming Soon: Wearable integrations.'],
  ['Biological Twin', 'Coming Soon: ROOTS Biological Twin™.'],
];

export default function PlatformPage() {
  return (
    <div className="clone-page">
      <main id="main" className="marketing-page inner-page">
      <section className="page-heading compact-heading">
        <p className="phase-label">Phase 1</p>
        <h1>Available now</h1>
      </section>
      <section className="platform-grid available-grid">
        {AVAILABLE.map(([title, body]) => (
          <article key={title}>
            <span className="status available">Available</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="page-heading platform-heading">
        <h2>Coming soon</h2>
      </section>
      <section className="platform-grid coming-grid">
        {COMING.map(([title, body]) => (
          <article key={title}>
            <span className="status">Coming Soon</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="architecture">
        <h2>Architecture principle</h2>
        <p>
          Future layers will expand biological context only after separate validation, governance and
          implementation.
        </p>
      </section>
    </main>
      </div>
  );
}
