// GET /api/admin/dashboard - dashboard statistics; requires the x-admin-api-key header
// (ported from apps/web).

import type { NextRequest } from 'next/server';
import { verifyAdminApiKey, withErrorHandling } from '@/lib/api/request';
import { adminService } from '@/lib/services/admin.service';
import { successResponse } from '@/lib/utils/responses';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    verifyAdminApiKey(request);

    const [stats, completionRate] = await Promise.all([
      adminService.getDashboardStats(),
      adminService.getCompletionRate(),
    ]);

    return successResponse(
      { stats, completionRate, timestamp: new Date().toISOString() },
      'Dashboard data retrieved successfully'
    );
  });
}
