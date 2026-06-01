import { instance } from './instance';
import type { TodayHabitsResponse, CheckInResponse } from '../types/habit';

export const getTodayHabits = async (): Promise<TodayHabitsResponse['data']> => {
  const res = await instance.get<TodayHabitsResponse>('/api/v1/habits/today');
  return res.data.data;
};

export const postCheckIn = async (habitId: number): Promise<CheckInResponse['data']> => {
  const res = await instance.post<CheckInResponse>('/api/v1/check-in', { habitId });
  return res.data.data;
};

export const deleteCheckIn = async (checkInId: number): Promise<void> => {
  await instance.delete(`/api/v1/check-in/${checkInId}`);
};
