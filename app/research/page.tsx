// Inner-page design copied from clonedwebsite/app/research/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function ResearchPage() {
  return (
    <InfoPage
      kicker="ROOTS / RESEARCH"
      title="Research with context."
      intro="We work with researchers and healthcare professionals to validate useful, responsible ways of understanding biological context."
      sections={[
        ['Pilot program', 'Independent pilots help us evaluate clarity, usefulness, and participant experience before new biological layers are introduced.'],
        ['Evidence first', 'Every new signal must be separately validated and governed. The platform does not turn an association into a diagnosis.'],
        ['For professionals', 'Our reports are designed to support informed conversations and education, not replace clinical judgment.'],
      ]}
    />
  );
}
