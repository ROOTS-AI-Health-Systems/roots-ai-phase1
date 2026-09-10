// Inner-page design copied from clonedwebsite/app/healthcare-professionals/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function HealthcareProfessionalsPage() {
  return (
    <InfoPage
      kicker="ROOTS / PROFESSIONALS"
      title="Built for better conversations."
      intro="ROOTS-AI gives professionals a structured way to discuss personal and biological context with participants."
      sections={[
        ['A clear starting point', 'Reports organize complex inputs into readable domains, drivers, and confidence notes.'],
        ['Governed language', 'The AI layer assists with language generation only. It does not diagnose, prescribe, or alter scores.'],
        ['Participant-first', 'Consent, access controls, and understandable explanations are part of the product experience.'],
      ]}
    />
  );
}
