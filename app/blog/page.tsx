// Inner-page design copied from clonedwebsite/app/blog/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function BlogPage() {
  return (
    <InfoPage
      kicker="ROOTS / JOURNAL"
      title="Ideas for clearer context."
      intro="Notes on biological context, responsible AI, and the conversations that data can support."
      sections={[
        ['Why context matters', 'A number becomes useful when it is presented with its source, limits, and meaning.'],
        ['Designing for trust', 'Consent and transparent language are product features, not afterthoughts.'],
      ]}
    />
  );
}
