import { httpContract } from '@app/contracts/http.contract';
import { LucideIcon } from 'lucide-react';

export interface DashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
  trend: 'up' | 'down';
}

export interface DashboardActivity {
  action: string;
  user: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  recentActivities: DashboardActivity[];
}

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await httpContract.client.get<DashboardData>('/dashboard');
    return response.data;
  },

  async getStats(): Promise<DashboardStat[]> {
    const response = await httpContract.client.get<DashboardStat[]>('/dashboard/stats');
    return response.data;
  },

  async getRecentActivities(): Promise<DashboardActivity[]> {
    const response = await httpContract.client.get<DashboardActivity[]>('/dashboard/activities');
    return response.data;
  },
};
