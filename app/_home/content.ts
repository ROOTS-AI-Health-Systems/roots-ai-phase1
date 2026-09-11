/**
 * PUB-01 copy.
 *
 * Wording is transcribed from the v1.2 copy authority:
 *   importantdocs/ROOTS_AI_DESIGN_IMPLEMENTATION_SINGLE_SOURCE_v1.2_FINAL/
 *   03_CONTENT_FUNCTION_CONTRACT/PUB-01_CONTENT_FUNCTION_CONTRACT.md
 *
 * Do not edit a string here without written ROOTS direction. Letter case that
 * the masters render in capitals (eyebrows, "STRAINED") is applied in CSS so the
 * governed strings stay exactly as written.
 */

/* ------------------------------------------------------------ Z02 hero */

export const HERO = {
  eyebrow: 'Biological Intelligence Platform',
  // Line grouping from the masters: two lines at 1440, three at 360.
  headline: ['Decode the Biology', 'Before You Fight', 'the Weight'] as const,
  body: 'ROOTS-AI™ turns a structured assessment into a governed biological intelligence report—helping you understand patterns in metabolism, hunger, sleep, circadian timing, stress, inflammation-related signals and perceived biological resistance.',
  primaryCta: { label: 'Start Your Assessment', href: '/assessment' },
  secondaryCta: { label: 'View Example Report', href: '/example-report' },
};

/* ----------------------------------------------------- Z03 trust strip */

export const TRUST = [
  'Educational, not diagnostic',
  'Deterministic scoring',
  'Governed AI explanation',
  'Private by design',
];

/* --------------------------------------------------- Z04 six features */

export const FEATURES_HEADING = {
  eyebrow: 'What changes',
  title: 'A connected view of the patterns behind the struggle',
};

export const FEATURES = [
  { title: 'Beyond a number on the scale', body: 'See the pattern behind the struggle.' },
  { title: 'Seven biological domains', body: 'One connected view.' },
  { title: 'Deterministic scores', body: 'AI assists with explanation, not calculation.' },
  { title: 'Your report', body: '19 transparent sections with your answers and limitations.' },
  { title: 'Private by design', body: 'Controlled access, versioning and audit.' },
  {
    title: 'Educational, not diagnostic',
    body: 'Designed to support informed conversations and realistic next steps.',
  },
];

/* -------------------------------------------------- Z05 seven domains */

export const DOMAINS_HEADING = {
  eyebrow: 'Seven connected domains',
  title: 'One biological intelligence framework',
};

/** Text alternative for the seven-domains image (_home/seven-domains.png), from its own labels. */
export const DOMAINS_IMAGE_ALT =
  'The seven biological domains connected to a human figure: Hunger & Appetite (signals, reward, eating behaviour), Metabolism (energy, insulin, storage), Safety & Immunity (inflammation, defense, repair), Inflammation (microbiome, gut barrier, systemic signals), Sleep & Recovery (rhythms, hormones, restoration), Circadian Timing (biological clock, hormonal rhythm) and Stress Response (HPA axis, resilience, adaptation). “The body is not a collection of parts, but a network of conversations.”';

/** Centre of the signature system: the Biological State reading. */
export const CORE = {
  reading: '61 / 100 · STRAINED',
  label:
    'Living Biological Intelligence System: Biological State 61 out of 100, Strained, connected to seven biological domains',
};

export interface Domain {
  /** Governed two-letter code (contract Z05), drawn in the node. */
  code: string;
  /** Short label drawn under the node, as in the masters. */
  label: string;
  /** Governed name and description from contract Z05. */
  name: string;
  body: string;
  /** Node centre in the signature system's own coordinates (masters). */
  x: number;
  y: number;
  /** Node accent from the approved palette (masters). */
  color: string;
}

/**
 * Codes are the canonical set from the governed content contract (Z05):
 * MR / HS / SR / CH / SL / IB / BS (ROOTS direction, 11 Sep 2026). The master SVG's
 * ME/HU/SL/CI/ST/IN/SA set is not used: its "SL" meant Sleep, not Stress Load.
 */
export const DOMAINS: Domain[] = [
  {
    code: 'MR',
    label: 'Metabolic',
    name: 'Metabolic Resistance™',
    body: 'Self-reported resistance to expected weight change and activity-related metabolic context.',
    x: -190,
    y: -110,
    color: '#4F8F86',
  },
  {
    code: 'HS',
    label: 'Hunger',
    name: 'Hunger & Satiety Signals™',
    body: 'Hunger, craving, fullness and post-meal response patterns.',
    x: -70,
    y: -180,
    color: '#C7A45B',
  },
  {
    code: 'SR',
    label: 'Sleep',
    name: 'Sleep Recovery Index™',
    body: 'Sleep duration, continuity and perceived restoration.',
    x: 90,
    y: -170,
    color: '#2A4060',
  },
  {
    code: 'CH',
    label: 'Circadian',
    name: 'Circadian Health Score™',
    body: 'Alignment of light, screen, meal and sleep timing.',
    x: 195,
    y: -75,
    color: '#4F8F86',
  },
  {
    code: 'SL',
    label: 'Stress',
    name: 'Stress Load™',
    body: 'Perceived tension, cognitive activation and stress-linked eating.',
    x: 185,
    y: 80,
    color: '#E67E22',
  },
  {
    code: 'IB',
    label: 'Inflammation',
    name: 'Inflammation Burden Index™',
    body: 'Non-specific symptom burden; not a laboratory or clinical inflammation measure.',
    x: 70,
    y: 170,
    color: '#C7A45B',
  },
  {
    code: 'BS',
    label: 'Safety',
    name: 'Biological Safety Signals™',
    body: 'Perceived energy, appetite drive and resistance signals.',
    x: -105,
    y: 160,
    color: '#27AE60',
  },
];

/* -------------------------------------------------- Z06 how it works */

export const HOW_HEADING = {
  eyebrow: 'How it works',
  title: 'From structured answers to governed explanation',
};

export const STEPS = [
  { num: '01', title: 'Assess', body: 'Complete the structured 73-question assessment.' },
  {
    num: '02',
    title: 'Validate',
    body: 'Approved responses are normalized and Not Applicable answers remain preserved.',
  },
  {
    num: '03',
    title: 'Analyse',
    body: 'Deterministic rules calculate seven domains and derived indicators, then select drivers, confidence and eligible content.',
  },
  {
    num: '04',
    title: 'Explain & Render',
    body: 'Governed AI turns approved explanation objects into clear language; web and PDF reports are produced from the same immutable report.',
  },
];

/* ---------------------------------------------- Z07 example report */

/** Approved sample values. Colours are the masters' metric accents. */
export const REPORT = {
  stateLabel: 'Biological State',
  score: '61',
  scoreOutOf: '/100',
  status: 'Strained',
  metrics: [
    { label: 'Stress Load', value: 75, color: '#E67E22' },
    { label: 'Sleep Recovery', value: 68, color: '#4F8F86' },
    { label: 'Metabolic Resistance', value: 62, color: '#C7A45B' },
  ],
  note: 'This is a questionnaire summary, not a medical risk probability.',
};

export const REPORT_STATES = {
  loading: {
    title: 'Preparing example report',
    body: 'No score is shown until approved sample data is available.',
  },
  error: {
    title: 'Example report unavailable',
    body: 'The reference could not load this state safely.',
    retry: 'Retry',
  },
};

/** Governed heading, intro sentence and action for the example report teaser (contract Z07). */
export const REPORT_HEADING = {
  eyebrow: 'Example report',
  title: 'See the state, drivers and boundaries clearly',
  body: 'The preview uses approved sample values and demonstrates the required loaded, loading and error states.',
  cta: { label: 'View Example Report', href: '/example-report' },
};

/* --------------------------------------------------- Z08 pilot CTA */

export const PILOT = {
  eyebrow: 'Pilot program',
  // Line grouping from the 360 master; one line at 1440.
  // The middle part is drawn as the approved wordmark, with this text as its alt (ROOTS
  // direction, 11 Sep 2026).
  title: ['Join the', 'ROOTS-AI™', 'Free Beta'] as const,
  body: 'The beta explores whether a structured, non-diagnostic assessment can help people understand self-reported patterns involving weight resistance, energy, sleep, stress and appetite.',
  cta: { label: 'Check Eligibility', href: '/pilot' },
  /** Governed eligibility and boundary statements (contract Z08). */
  statements: [
    'Adults aged 18 and over.',
    'Participation is voluntary and withdrawal is permitted.',
    'The experience is educational and does not provide medical care.',
    'Usability feedback and any research participation require separate consent.',
    'No payment is required for the approved beta cohort.',
  ],
};
