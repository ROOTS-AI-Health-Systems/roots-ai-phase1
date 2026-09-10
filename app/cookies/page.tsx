// Inner-page design copied from clonedwebsite/app/cookies/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function CookiesPage() {
  return (
    <InfoPage
      kicker="ROOTS / LEGAL"
      title="Cookie Notice"
      intro="We use necessary technologies to operate the service and limited analytics only where your choices allow it."
      sections={[
        ['Necessary cookies', 'These support security, navigation, and session functionality.'],
        ['Your choices', 'You can manage optional analytics preferences through your browser settings.'],
      ]}
    />
  );
}
