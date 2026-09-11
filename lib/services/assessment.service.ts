// Assessment workflow (ported from apps/web/src/lib/services/assessment.service.ts).
// Tables: users, assessment_sessions, assessment_responses (apps/web/src/lib/supabase/schema.sql).

import { getSupabaseAdmin } from '@/lib/supabase/server';
import { NotFoundError } from '@/lib/utils/errors';
import type { AssessmentResponse, AssessmentSession } from '@/lib/types';

class AssessmentService {
  private get db() {
    return getSupabaseAdmin();
  }

  async createAssessmentSession(userId: string): Promise<AssessmentSession> {
    const { data, error } = await this.db
      .from('assessment_sessions')
      .insert({ user_id: userId, status: 'in_progress', current_module: 1, answers_json: {} })
      .select()
      .single();

    if (error) throw new Error(`Failed to create session: ${error.message}`);
    return data;
  }

  async getAssessmentSession(sessionId: string): Promise<AssessmentSession | null> {
    const { data, error } = await this.db
      .from('assessment_sessions')
      .select()
      .eq('id', sessionId)
      .maybeSingle();

    if (error) throw new Error(`Failed to fetch session: ${error.message}`);
    return data;
  }

  /** The user's own session; anyone else's reads as not found, so its existence is not revealed. */
  async getOwnedSession(sessionId: string, userId: string): Promise<AssessmentSession> {
    const session = await this.getAssessmentSession(sessionId);
    if (!session || session.user_id !== userId) throw new NotFoundError('Assessment session');
    return session;
  }

  /** Stores the answer and mirrors it into the session's answers_json. */
  async saveResponse(
    sessionId: string,
    moduleId: number,
    questionId: number,
    answer: Record<string, unknown>
  ): Promise<AssessmentResponse> {
    const { data, error } = await this.db
      .from('assessment_responses')
      .insert({ session_id: sessionId, module_id: moduleId, question_id: questionId, answer })
      .select()
      .single();

    if (error) throw new Error(`Failed to save response: ${error.message}`);

    await this.updateSessionAnswers(sessionId, moduleId, questionId, answer);
    return data;
  }

  private async updateSessionAnswers(
    sessionId: string,
    moduleId: number,
    questionId: number,
    answer: Record<string, unknown>
  ): Promise<void> {
    const session = await this.getAssessmentSession(sessionId);
    if (!session) throw new NotFoundError('Assessment session');

    const moduleKey = `module_${moduleId}`;
    const answers = {
      ...session.answers_json,
      [moduleKey]: { ...session.answers_json?.[moduleKey], [`question_${questionId}`]: answer },
    };

    const { error } = await this.db
      .from('assessment_sessions')
      .update({ answers_json: answers, current_module: Math.max(session.current_module, moduleId) })
      .eq('id', sessionId);

    if (error) throw new Error(`Failed to update answers: ${error.message}`);
  }

  async submitAssessment(sessionId: string, researchConsent: boolean): Promise<AssessmentSession> {
    const { data, error } = await this.db
      .from('assessment_sessions')
      .update({
        status: 'submitted',
        research_consent: researchConsent,
        completed_at: new Date().toISOString(),
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw new Error(`Failed to submit assessment: ${error.message}`);
    return data;
  }

  /** Best effort: a missing column must not fail the request that triggered it. */
  async updateUserLastAccessed(userId: string): Promise<void> {
    const { error } = await this.db
      .from('users')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) console.warn(`Could not update last_accessed_at: ${error.message}`);
  }
}

export const assessmentService = new AssessmentService();
