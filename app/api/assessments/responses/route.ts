// POST /api/assessments/responses { sessionId, moduleId, questionId, answer } - save one answer
// (ported from apps/web; now limited to the signed-in user's own, unsubmitted session).

import type { NextRequest } from 'next/server';
import { readJson, withErrorHandling } from '@/lib/api/request';
import { requireUser } from '@/lib/auth/session';
import { assessmentService } from '@/lib/services/assessment.service';
import { ConflictError, ValidationError } from '@/lib/utils/errors';
import { successResponse } from '@/lib/utils/responses';
import { validateModuleId, validateUUID } from '@/lib/utils/validators';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const { sessionId, moduleId, questionId, answer } = await readJson(request);

    if (!sessionId || moduleId === undefined || questionId === undefined || !answer) {
      throw new ValidationError('sessionId, moduleId, questionId, and answer are required');
    }
    if (!validateUUID(sessionId)) throw new ValidationError('Invalid session ID format');
    if (!validateModuleId(moduleId)) throw new ValidationError('Invalid module ID');
    if (typeof questionId !== 'number' || !Number.isInteger(questionId) || questionId < 0) {
      throw new ValidationError('Invalid question ID');
    }
    if (typeof answer !== 'object' || Array.isArray(answer)) {
      throw new ValidationError('answer must be an object');
    }

    const user = await requireUser(request);
    const session = await assessmentService.getOwnedSession(sessionId, user.id);
    if (session.status !== 'in_progress') {
      throw new ConflictError('This assessment has already been submitted');
    }

    const saved = await assessmentService.saveResponse(
      sessionId,
      moduleId,
      questionId,
      answer as Record<string, unknown>
    );
    return successResponse(saved, 'Response saved successfully');
  });
}
