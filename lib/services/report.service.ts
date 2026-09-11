/**
 * Report generation (ported from apps/web/src/lib/services/report.service.ts).
 *
 * apps/web scored three placeholder sections (clinical / functional / psychosocial) that no
 * stored answer ever matched, so every report came out 0 / "Critical". Reports are scored
 * with the same rules the report page uses (lib/roots/assessment.ts), so the stored and the
 * displayed values agree.
 */

import { scoreAnswers } from '@/lib/roots/assessment';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import type { AssessmentSession, Report, SessionAnswers } from '@/lib/types';

/** Flattens answers_json ({ module_n: { question_n: { questionKey, value } } }) to key -> value. */
export function answersFromSession(answersJson: SessionAnswers | null | undefined): Record<string, number> {
  const answers: Record<string, number> = {};
  for (const moduleAnswers of Object.values(answersJson ?? {})) {
    for (const answer of Object.values(moduleAnswers ?? {})) {
      const { questionKey, value } = (answer ?? {}) as { questionKey?: unknown; value?: unknown };
      if (typeof questionKey === 'string' && Number.isFinite(Number(value))) {
        answers[questionKey] = Number(value);
      }
    }
  }
  return answers;
}

class ReportService {
  private get db() {
    return getSupabaseAdmin();
  }

  async generateReport(session: AssessmentSession, researchConsent: boolean): Promise<Report> {
    const answers = answersFromSession(session.answers_json);
    const { categoryScores, overallScore, band } = scoreAnswers(answers);

    const reportData = {
      sessionId: session.id,
      userId: session.user_id,
      generatedAt: new Date().toISOString(),
      scores: categoryScores,
      overallScore,
      band,
      answers,
      researchConsent,
    };

    const { data, error } = await this.db
      .from('reports')
      .insert({
        session_id: session.id,
        user_id: session.user_id,
        report_data: reportData,
        status: 'generated',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to generate report: ${error.message}`);
    return data;
  }

  async getReportById(reportId: string): Promise<Report | null> {
    const { data, error } = await this.db.from('reports').select().eq('id', reportId).maybeSingle();
    if (error) throw new Error(`Failed to fetch report: ${error.message}`);
    return data;
  }

  async getReportBySession(sessionId: string): Promise<Report | null> {
    const { data, error } = await this.db
      .from('reports')
      .select()
      .eq('session_id', sessionId)
      .maybeSingle();
    if (error) throw new Error(`Failed to fetch report: ${error.message}`);
    return data;
  }
}

export const reportService = new ReportService();
