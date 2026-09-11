// Request helpers for the API routes (ported from apps/web/src/lib/middleware/*.ts).

import crypto from 'crypto';
import { isIP } from 'net';
import type { NextRequest } from 'next/server';
import { AppError, AuthError, ServerError, ValidationError } from '@/lib/utils/errors';
import { errorResponse } from '@/lib/utils/responses';

/**
 * Runs a handler and turns thrown errors into the standard error body. AppErrors keep their
 * own status (400 / 401 / 404 / 409); apps/web answered 500 for everything except 400.
 * Only server failures are logged, so expected client errors do not flood the logs.
 */
export async function withErrorHandling(handler: () => Promise<Response>): Promise<Response> {
  try {
    return await handler();
  } catch (error) {
    const appError =
      error instanceof AppError
        ? error
        : new ServerError(error instanceof Error ? error.message : 'Unknown error');
    if (appError.statusCode >= 500) console.error('Request error:', error);
    return errorResponse(appError);
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body : {};
  } catch {
    throw new ValidationError('Invalid JSON in request body');
  }
}

/** NextRequest.ip was removed in Next 15; Vercel and most proxies send x-forwarded-for. */
export function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwarded || request.headers.get('x-real-ip') || '';
  return isIP(ip) ? ip : null;
}

/** Admin endpoints require the x-admin-api-key header to match ADMIN_API_KEY. */
export function verifyAdminApiKey(request: NextRequest): void {
  const expected = process.env.ADMIN_API_KEY;
  const given = request.headers.get('x-admin-api-key');
  if (!expected || !given) throw new AuthError('Unauthorized: Invalid API key');

  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new AuthError('Unauthorized: Invalid API key');
  }
}
