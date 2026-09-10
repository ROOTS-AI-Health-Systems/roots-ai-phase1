'use client';

// Inner-page design copied from clonedwebsite/app/privacy/page.tsx; styles scoped in app/clone-pages.css.

const SECTIONS: [string, string][] = [
  ['Who we are', 'ROOTS AI HEALTH SYSTEMS, Inc. ("ROOTS-AI™", "we", "us") provides an educational biological assessment and reporting service. This notice explains how we handle personal data when you use the Phase 1 web platform.'],
  ['Data we collect', 'Account and contact information; assessment answers; physical measurements you provide; consent records; generated scores and reports; device, security and audit information; support enquiries; and limited public-site analytics where consent is required.'],
  ['Why we use it', 'To provide, secure and improve the service; save and resume assessments; generate and deliver reports; respond to enquiries; meet legal and security obligations; and conduct separately consented research or pilot analysis.'],
  ['Sensitive data', 'Assessment answers and identifiable wellness information may be sensitive personal data. We process them only for stated purposes and with appropriate consent or other lawful authority required by applicable law.'],
  ['Research', 'Research participation is optional and requires separate explicit consent. Service access is not conditioned on research consent.'],
  ['Security', 'We use access controls, audit records and appropriate safeguards to protect information.'],
  ['Your choices and rights', 'You may request access, correction, deletion or information about how your data is used, subject to applicable law.'],
];

export default function PrivacyPage() {
  return (
    <div className="clone-page">
      <main id="main" className="privacy-page">
      <section className="privacy-heading">
        <h1>Privacy Notice</h1>
        <p>Effective date: 21 July 2026 · Version: 1.0</p>
        <button className="print-button" onClick={() => window.print()}>
          ▣ Print
        </button>
      </section>
      <div className="privacy-layout">
        <aside>
          <strong>Contents</strong>
          {SECTIONS.map(([title], i) => (
            <a key={title} href={`#privacy-${i}`}>
              {i + 1}. {title}
            </a>
          ))}
        </aside>
        <article>
          {SECTIONS.map(([title, body], i) => (
            <section key={title} id={`privacy-${i}`}>
              <h2>
                {i + 1}. {title}
              </h2>
              <p>{body}</p>
            </section>
          ))}
        </article>
      </div>
    </main>
      </div>
  );
}
