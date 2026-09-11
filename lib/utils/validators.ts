// Input validation (ported from apps/web/src/lib/utils/validators.ts).

import { z } from 'zod';

const emailSchema = z.email('Invalid email address');

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function validateEmail(email: unknown): email is string {
  return emailSchema.safeParse(email).success;
}

export function validateUUID(id: unknown): id is string {
  return typeof id === 'string' && UUID.test(id);
}

/** Module numbers 1-11, as in apps/web. */
export function validateModuleId(moduleId: unknown): moduleId is number {
  return typeof moduleId === 'number' && Number.isInteger(moduleId) && moduleId >= 1 && moduleId <= 11;
}
