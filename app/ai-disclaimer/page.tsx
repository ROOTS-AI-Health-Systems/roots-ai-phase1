// Inner-page design copied from clonedwebsite/app/ai-disclaimer/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function AiDisclaimerPage() {
  return (
    <InfoPage
      kicker="ROOTS / LEGAL"
      title="AI Disclaimer"
      intro="AI is used in a limited and governed role within the ROOTS-AI reporting workflow."
      sections={[
        ['What AI does', 'AI assists with language generation from approved inputs and rules.'],
        ['What AI does not do', 'AI does not diagnose, prescribe, change scores, or invent participant facts.'],
      ]}
    />
  );
}
