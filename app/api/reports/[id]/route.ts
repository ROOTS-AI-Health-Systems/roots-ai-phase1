// GET /api/reports/[id] - one of the signed-in user's reports (ported from apps/web, which
// served any report to anyone holding its id).

import type { NextRequest } from 'next/server';
import { withErrorHandling } from '@/lib/api/request';
import { requireUser } from '@/lib/auth/session';
import { reportService } from '@/lib/services/report.service';
import { NotFoundError, ValidationError } from '@/lib/utils/errors';
import { successResponse } from '@/lib/utils/responses';
import { validateUUID } from '@/lib/utils/validators';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withErrorHandling(async () => {
    const { id } = await params;
    if (!validateUUID(id)) throw new ValidationError('Invalid report ID format');

    const user = await requireUser(request);
    const report = await reportService.getReportById(id);
    if (!report || report.user_id !== user.id) throw new NotFoundError('Report');

    return successResponse(report, 'Report retrieved successfully');
  });
}
