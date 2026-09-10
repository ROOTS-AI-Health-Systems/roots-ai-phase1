// Inner-page design copied from clonedwebsite/app/terms/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function TermsPage() {
  return (
    <InfoPage
      kicker="ROOTS / LEGAL"
      title="Terms of Use"
      intro="These terms describe the conditions for using the ROOTS-AI educational assessment and reporting service."
      sections={[
        ['Educational service', 'The service provides educational information and is not medical advice, diagnosis, or treatment.'],
        ['Your responsibility', 'Provide accurate responses and protect any secure links or account information associated with your assessment.'],
      ]}
    />
  );
}
