// Inner-page design copied from clonedwebsite/app/about/page.tsx; styles scoped in app/clone-pages.css.

import InfoPage from '@/components/InfoPage';

export default function AboutPage() {
  return (
    <InfoPage
      kicker="ROOTS / ABOUT"
      title="Medicine Before Symptoms™"
      intro="ROOTS AI HEALTH SYSTEMS, Inc. builds educational tools that make biological context clearer and more useful."
      sections={[
        ['Our principle', 'Good interpretation starts with humility: data can inform a conversation without defining a person.'],
        ['Our standard', 'We combine structured inputs, deterministic rules, careful governance, and transparent communication.'],
        ['Get in touch', 'For product, research, or professional enquiries, use the Contact link in the footer.'],
      ]}
    />
  );
}
