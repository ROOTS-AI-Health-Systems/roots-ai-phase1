'use client';

// Inner-page design copied from clonedwebsite/app/report/[reportId]/page.tsx; styles scoped in app/clone-pages.css.

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { answersKey, scoreAnswers } from '@/lib/roots/assessment';

export default function ReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem(answersKey(reportId));
    if (saved) setAnswers(JSON.parse(saved));
  }, [reportId]);

  const report = scoreAnswers(answers);

  return (
    <div className="clone-page">
      <main id="main" className="route-shell route-shell-wide">
      <p className="eyebrow">ROOTS / REPORT</p>
      <h1>Your growth map is ready.</h1>
      <p className="route-lede">
        A starting point for understanding how your roots, learning style, and motivation connect.
      </p>
      <section className="report-summary">
        <div>
          <span className="report-score">{report.overallScore}</span>
          <span className="report-denom">/ 100</span>
          <h2>{report.band}</h2>
        </div>
        <div className="category-list">
          {Object.entries(report.categoryScores).map(([category, score]) => (
            <div key={category}>
              <span>{category}</span>
              <strong>{score}%</strong>
            </div>
          ))}
        </div>
      </section>
      <p className="report-note">
        This reflection is educational and does not provide medical or professional advice.
      </p>
    </main>
      </div>
  );
}
