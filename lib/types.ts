// Row and API shapes for the backend (ported from apps/web/src/lib/types.ts).

export interface User {
  id: string;
  email: string;
  name?: string | null;
  status?: 'pending' | 'active' | 'completed';
  created_at?: string;
  updated_at?: string;
  last_login?: string | null;
  last_accessed_at?: string | null;
}

/** answers_json: { module_<n>: { question_<n>: answer } } */
export type SessionAnswers = Record<string, Record<string, unknown>>;

export interface AssessmentSession {
  id: string;
  user_id: string;
  status: 'in_progress' | 'submitted' | 'abandoned';
  current_module: number;
  answers_json: SessionAnswers;
  research_consent: boolean;
  started_at: string;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssessmentResponse {
  id: string;
  session_id: string;
  module_id: number;
  question_id: number;
  answer: Record<string, unknown>;
  answered_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  session_id: string;
  user_id: string;
  report_data: Record<string, unknown>;
  status: 'generated' | 'downloaded';
  version: string;
  created_at: string;
  accessed_at?: string | null;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
  details?: Record<string, unknown>;
}
