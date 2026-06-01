import { instance } from './instance';
import type { AiCoachingResponse } from '../types/ai';

export const getAiCoaching = async (): Promise<string> => {
  const res = await instance.get<AiCoachingResponse>('/api/v1/ai/coaching');
  return res.data.data;
};
