// Admin statistics (ported from apps/web/src/lib/services/admin.service.ts; the methods the
// dashboard endpoint uses).

import { getSupabaseAdmin } from '@/lib/supabase/server';

class AdminService {
  private get db() {
    return getSupabaseAdmin();
  }

  async getDashboardStats() {
    const [users, active, completed, reports] = await Promise.all([
      this.db.from('users').select('id', { count: 'exact', head: true }),
      this.db
        .from('assessment_sessions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'in_progress'),
      this.db
        .from('assessment_sessions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'submitted'),
      this.db.from('reports').select('id', { count: 'exact', head: true }),
    ]);

    const failed = [users, active, completed, reports].find((result) => result.error);
    if (failed?.error) throw new Error(`Failed to load dashboard stats: ${failed.error.message}`);

    return {
      totalUsers: users.count ?? 0,
      activeAssessments: active.count ?? 0,
      completedAssessments: completed.count ?? 0,
      totalReports: reports.count ?? 0,
    };
  }

  async getCompletionRate() {
    const { data: sessions, error } = await this.db.from('assessment_sessions').select('status');
    if (error) throw new Error(`Failed to load completion rate: ${error.message}`);

    const total = sessions?.length ?? 0;
    const completed = sessions?.filter((s) => s.status === 'submitted').length ?? 0;
    const abandoned = sessions?.filter((s) => s.status === 'abandoned').length ?? 0;

    return { total, completed, abandoned, rate: total > 0 ? (completed / total) * 100 : 0 };
  }
}

export const adminService = new AdminService();
