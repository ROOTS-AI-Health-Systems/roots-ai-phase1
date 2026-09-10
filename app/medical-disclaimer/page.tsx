// Inner-page design copied from clonedwebsite/app/medical-disclaimer/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function MedicalDisclaimerPage() {
  return (
    <InfoPage
      kicker="ROOTS / LEGAL"
      title="Medical Disclaimer"
      intro="ROOTS-AI is an educational biological assessment and reporting service."
      sections={[
        ['Not medical advice', 'Information in the service does not diagnose, treat, cure, or prevent any disease or condition.'],
        ['Talk to a professional', 'Discuss health concerns and decisions with a qualified healthcare professional.'],
      ]}
    />
  );
}
