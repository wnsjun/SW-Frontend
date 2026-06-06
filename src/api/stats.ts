import { instance } from './instance';
import type { DashboardResponse, AiInsightData } from '../types/stats';

export const getDashboard = async () => {
  const res = await instance.get<DashboardResponse>('/api/v1/stats/dashboard');
  return res.data.data;
};

export const getAiInsights = async () => {
  const res = await instance.get<AiInsightData>('/api/v1/ai/insights');
  return res.data ?? { type: 'COLD_START' as const, hasInsight: false };
};
