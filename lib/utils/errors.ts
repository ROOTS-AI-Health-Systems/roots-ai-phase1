// Error types for the API routes (ported from apps/web/src/lib/utils/errors.ts).

import type { ApiError } from '@/lib/types';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message = 'Authentication failed', details?: Record<string, unknown>) {
    super(message, 'AUTH_ERROR', 401, details);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied', details?: Record<string, unknown>) {
    super(message, 'AUTHORIZATION_ERROR', 403, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource', details?: Record<string, unknown>) {
    super(`${resource} not found`, 'NOT_FOUND', 404, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details?: Record<string, unknown>) {
    super(message, 'CONFLICT', 409, details);
  }
}

export class ServerError extends AppError {
  constructor(message = 'Internal server error', details?: Record<string, unknown>) {
    super(message, 'SERVER_ERROR', 500, details);
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof AppError) {
    return { code: error.code, message: error.message, details: error.details };
  }
  if (error instanceof Error) {
    return { code: 'UNKNOWN_ERROR', message: error.message };
  }
  return { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred' };
}

export function getStatusCode(error: unknown): number {
  return error instanceof AppError ? error.statusCode : 500;
}
