import { instance } from './instance';
import type { HistoryResponse } from '../types/history';

export const getHistory = async (date: string): Promise<HistoryResponse['data']> => {
  const res = await instance.get<HistoryResponse>('/api/v1/history', { params: { date } });
  return res.data.data;
};
