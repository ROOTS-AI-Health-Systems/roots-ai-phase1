// Inner-page design copied from clonedwebsite/app/pilot/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function PilotPage() {
  return (
    <InfoPage
      kicker="ROOTS / PILOT"
      title="Help shape the next layer."
      intro="Pilot participation is optional and separately consented. Your feedback helps us improve the experience."
      sections={[
        ['What pilots test', 'We test usability, report comprehension, and the responsible presentation of validated signals.'],
        ['Separate consent', 'Service access is never conditioned on research or pilot participation.'],
      ]}
    />
  );
}
