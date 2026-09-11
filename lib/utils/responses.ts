// Standard API response bodies (ported from apps/web/src/lib/utils/responses.ts).

import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types';
import { getStatusCode, toApiError } from './errors';

export function successResponse<T>(data: T, message = 'Success', status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data, message }, { status });
}

export function errorResponse(error: unknown, status?: number) {
  const apiError = toApiError(error);
  return NextResponse.json<ApiResponse>(
    { success: false, error: apiError.message, code: apiError.code, details: apiError.details },
    { status: status ?? getStatusCode(error) }
  );
}
