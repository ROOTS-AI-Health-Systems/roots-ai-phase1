/**
 * Assessment modules and scoring used by /assessment/[sessionId]/module/[moduleId]
 * and /report/[reportId]. Answers are kept in sessionStorage under
 * `roots-answers-<sessionId>`.
 */

export interface ChoiceOption {
  value: number;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'choice';
  min?: number;
  max?: number;
  options?: ChoiceOption[];
}

export interface AssessmentModule {
  id: string;
  title: string;
  category: string;
  questions: Question[];
}

export const MODULES: AssessmentModule[] = [
  {
    id: 'identity',
    title: 'Identity & Roots',
    category: 'identity',
    questions: [
      { id: 'identity-1', text: 'How connected do you feel to your family\'s cultural or ancestral roots?', type: 'scale', min: 1, max: 5 },
      { id: 'identity-2', text: 'How often do you engage in traditions or practices passed down from your family?', type: 'scale', min: 1, max: 5 },
      {
        id: 'identity-3',
        text: 'Which best describes your knowledge of your family history?',
        type: 'choice',
        options: [
          { value: 1, label: 'I know very little' },
          { value: 3, label: 'I know some stories' },
          { value: 5, label: 'I know it in detail' },
        ],
      },
    ],
  },
  {
    id: 'learning',
    title: 'Learning Style',
    category: 'learning',
    questions: [
      { id: 'learning-1', text: 'How comfortable are you learning new concepts independently?', type: 'scale', min: 1, max: 5 },
      {
        id: 'learning-2',
        text: 'Which learning method works best for you?',
        type: 'choice',
        options: [
          { value: 1, label: 'Reading' },
          { value: 3, label: 'Discussion' },
          { value: 5, label: 'Hands-on practice' },
        ],
      },
    ],
  },
  {
    id: 'goals',
    title: 'Goals & Motivation',
    category: 'motivation',
    questions: [
      { id: 'goals-1', text: 'How clear are your current personal or professional goals?', type: 'scale', min: 1, max: 5 },
      { id: 'goals-2', text: 'How motivated do you feel to pursue those goals right now?', type: 'scale', min: 1, max: 5 },
    ],
  },
];

export const SCORING = {
  categories: {
    identity: { label: 'Identity & Roots', maxPerQuestion: 5, weight: 1 },
    learning: { label: 'Learning Style', maxPerQuestion: 5, weight: 1 },
    motivation: { label: 'Goals & Motivation', maxPerQuestion: 5, weight: 1 },
  } as Record<string, { label: string; maxPerQuestion: number; weight: number }>,
  bands: [
    { min: 0, max: 40, label: 'Emerging' },
    { min: 41, max: 70, label: 'Developing' },
    { min: 71, max: 100, label: 'Strong' },
  ],
};

export function answersKey(sessionId: string) {
  return `roots-answers-${sessionId}`;
}

/** Category percentages, their unweighted mean, and the matching band. */
export function scoreAnswers(answers: Record<string, number>) {
  const totals: Record<string, { sum: number; max: number }> = {};
  for (const category of Object.keys(SCORING.categories)) totals[category] = { sum: 0, max: 0 };

  for (const assessmentModule of MODULES) {
    const category = assessmentModule.category;
    const maxPerQuestion = SCORING.categories[category]?.maxPerQuestion ?? 5;
    for (const question of assessmentModule.questions) {
      totals[category].sum += answers[question.id] ?? 0;
      totals[category].max += maxPerQuestion;
    }
  }

  const categoryScores: Record<string, number> = {};
  for (const [category, { sum, max }] of Object.entries(totals)) {
    categoryScores[category] = max > 0 ? Math.round((sum / max) * 100) : 0;
  }

  const values = Object.values(categoryScores);
  const overallScore = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  const band = SCORING.bands.find((b) => overallScore >= b.min && overallScore <= b.max)?.label ?? 'Unknown';

  return { categoryScores, overallScore, band };
}

