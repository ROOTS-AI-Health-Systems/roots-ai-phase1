/**
 * POST /api/assessments/submit { sessionId, researchConsent? }
 *
 * Ported from apps/web: marks the session submitted, generates the report and sends the
 * completion email (logged only, no email service yet). Limited to the signed-in user's own
 * session. Submitting again returns the existing report instead of failing on the unique
 * reports.session_id constraint.
 */

import type { NextRequest } from 'next/server';
import { readJson, withErrorHandling } from '@/lib/api/request';
import { requireUser } from '@/lib/auth/session';
import { assessmentService } from '@/lib/services/assessment.service';
import { emailService } from '@/lib/services/email.service';
import { reportService } from '@/lib/services/report.service';
import { ValidationError } from '@/lib/utils/errors';
import { successResponse } from '@/lib/utils/responses';
import { validateUUID } from '@/lib/utils/validators';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const { sessionId, researchConsent } = await readJson(request);
    if (!sessionId) throw new ValidationError('Session ID is required');
    if (!validateUUID(sessionId)) throw new ValidationError('Invalid session ID format');
    const consent = researchConsent === true;

    const user = await requireUser(request);
    const session = await assessmentService.getOwnedSession(sessionId, user.id);

    if (session.status === 'submitted') {
      const existing = await reportService.getReportBySession(sessionId);
      if (existing) {
        return successResponse(
          { session, report: { id: existing.id, status: existing.status } },
          'Assessment already submitted'
        );
      }
    }

    const submitted = await assessmentService.submitAssessment(sessionId, consent);
    const report = await reportService.generateReport(submitted, consent);

    // The report page is keyed by session id (app/report/[reportId]/page.tsx).
    await emailService.sendAssessmentCompleteEmail(user.email, `${request.nextUrl.origin}/report/${sessionId}`);

    return successResponse(
      { session: submitted, report: { id: report.id, status: report.status } },
      'Assessment submitted successfully'
    );
  });
}
