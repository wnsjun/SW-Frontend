import { instance } from './instance';
import type { TodayHabitsResponse, CheckInResponse, HabitsResponse, HabitRequest, HabitMutationResponse } from '../types/habit';

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

export const getHabits = async (): Promise<HabitsResponse['data']> => {
  const res = await instance.get<HabitsResponse>('/api/v1/habits');
  return res.data.data;
};

export const postHabit = async (data: HabitRequest): Promise<HabitMutationResponse['data']> => {
  const res = await instance.post<HabitMutationResponse>('/api/v1/habits', data);
  return res.data.data;
};

export const putHabit = async (habitId: number, data: HabitRequest): Promise<HabitMutationResponse['data']> => {
  const res = await instance.put<HabitMutationResponse>(`/api/v1/habits/${habitId}`, data);
  return res.data.data;
};

export const deleteHabit = async (habitId: number): Promise<void> => {
  await instance.delete(`/api/v1/habits/${habitId}`);
};
