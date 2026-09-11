/**
 * /api/assessments/sessions
 *   POST       start an assessment session for the signed-in user
 *   GET ?id=   read one of the signed-in user's sessions
 *
 * Ported from apps/web. There, sessions were created only by the unused /api/auth/verify
 * flow; POST lets the magic-link flow start one. Both methods now require sign-in, and a
 * session belonging to someone else reads as not found.
 */

import type { NextRequest } from 'next/server';
import { withErrorHandling } from '@/lib/api/request';
import { requireUser } from '@/lib/auth/session';
import { assessmentService } from '@/lib/services/assessment.service';
import { ValidationError } from '@/lib/utils/errors';
import { successResponse } from '@/lib/utils/responses';
import { validateUUID } from '@/lib/utils/validators';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    const user = await requireUser(request);
    const session = await assessmentService.createAssessmentSession(user.id);
    return successResponse(session, 'Session created successfully', 201);
  });
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const sessionId = request.nextUrl.searchParams.get('id');
    if (!sessionId) throw new ValidationError('Session ID is required');
    if (!validateUUID(sessionId)) throw new ValidationError('Invalid session ID format');

    const user = await requireUser(request);
    const session = await assessmentService.getOwnedSession(sessionId, user.id);

    await assessmentService.updateUserLastAccessed(user.id);
    return successResponse(session, 'Session retrieved successfully');
  });
}
