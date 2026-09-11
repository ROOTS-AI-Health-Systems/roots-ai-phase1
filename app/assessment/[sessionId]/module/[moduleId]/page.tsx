'use client';

// Inner-page design copied from clonedwebsite/app/assessment/[sessionId]/module/[moduleId]/page.tsx; styles scoped in app/clone-pages.css.

import { useParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { MODULES, answersKey, type AssessmentModule, type Question } from '@/lib/roots/assessment';

/**
 * Mirrors a module's answers to the backend (ported from apps/web) and, after the last module,
 * submits the assessment. Best effort: the answers are already in sessionStorage, which the
 * report page reads, so a failed save (for example a session started without sign-in) does
 * not block the assessment.
 */
async function saveToServer(
  sessionId: string,
  moduleIndex: number,
  assessmentModule: AssessmentModule,
  answers: Record<string, number>,
  submit: boolean
) {
  const post = (url: string, body: unknown) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

  try {
    // One at a time: each save rewrites the session's answers_json, so parallel saves would drop answers.
    for (const [questionIndex, question] of assessmentModule.questions.entries()) {
      if (answers[question.id] === undefined) continue;
      const response = await post('/api/assessments/responses', {
        sessionId,
        moduleId: moduleIndex + 1,
        questionId: questionIndex + 1,
        answer: { questionKey: question.id, value: answers[question.id] },
      });
      if (!response.ok) throw new Error(`Saving ${question.id} failed (${response.status})`);
    }

    if (submit) {
      const response = await post('/api/assessments/submit', { sessionId });
      if (!response.ok) throw new Error(`Submitting failed (${response.status})`);
    }
  } catch (error) {
    console.warn('Answers kept in this browser only:', error);
  }
}

function QuestionField({ question, defaultValue }: { question: Question; defaultValue?: number }) {
  const options =
    question.type === 'scale'
      ? Array.from(
          { length: (question.max ?? 5) - (question.min ?? 1) + 1 },
          (_, i) => (question.min ?? 1) + i
        ).map((value) => ({ value, label: String(value) }))
      : question.options ?? [];

  return (
    <fieldset className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <legend className="mb-3 text-base font-medium text-zinc-900 dark:text-zinc-50">
        {question.text}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm has-checked:border-zinc-900 has-checked:bg-zinc-900 has-checked:text-white dark:border-zinc-800 dark:has-checked:border-zinc-50 dark:has-checked:bg-zinc-50 dark:has-checked:text-black"
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              required
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ProgressBar({ current, total, className }: { current: number; total: number; className?: string }) {
  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="mb-1 flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          Step {current} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-50"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function AssessmentModulePage() {
  const { sessionId, moduleId } = useParams<{ sessionId: string; moduleId: string }>();
  const [saving, setSaving] = useState(false);
  const activeModule = MODULES.find((m) => m.id === moduleId);

  if (!activeModule) {
    return (
      <div className="clone-page">
      <main id="main" className="route-shell">
        <h1>Module not found</h1>
        <p className="route-lede">This learning branch does not exist.</p>
      </main>
      </div>
    );
  }

  const index = MODULES.findIndex((m) => m.id === activeModule.id);
  const isLast = activeModule.id === MODULES.at(-1)?.id;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const answers: Record<string, number> = {
      ...JSON.parse(sessionStorage.getItem(answersKey(sessionId)) ?? '{}'),
    };
    activeModule!.questions.forEach((question) => {
      const value = data.get(question.id);
      if (value) answers[question.id] = Number(value);
    });
    sessionStorage.setItem(answersKey(sessionId), JSON.stringify(answers));

    setSaving(true);
    await saveToServer(sessionId, index, activeModule!, answers, isLast);

    const next = MODULES[index + 1];
    window.location.assign(next ? `/assessment/${sessionId}/module/${next.id}` : `/report/${sessionId}`);
  }

  return (
    <div className="clone-page">
      <main id="main" className="route-shell route-shell-wide">
      <p className="eyebrow">MODULE / {activeModule.category.toUpperCase()}</p>
      <h1>{activeModule.title}</h1>
      <p className="route-lede">Answer each question in the way that feels most accurate today.</p>
      <ProgressBar current={index + 1} total={MODULES.length} className="route-progress" />
      <form className="question-form" onSubmit={handleSubmit}>
        {activeModule.questions.map((question) => (
          <QuestionField key={question.id} question={question} />
        ))}
        <button className="continue-button" type="submit" disabled={saving}>
          {isLast ? 'View my report →' : 'Continue →'}
        </button>
      </form>
    </main>
      </div>
  );
}
