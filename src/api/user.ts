import { instance } from './instance';
import type { ProfileResponse } from '../types/user';

export const getMyProfile = async (): Promise<ProfileResponse> => {
  const res = await instance.get<ProfileResponse>('/api/v1/users/me');
  return res.data;
};

export const patchNickname = async (nickname: string): Promise<void> => {
  await instance.patch('/api/v1/users/me/nickname', { nickname });
};

export const postLogout = async (): Promise<void> => {
  await instance.post('/api/v1/users/me/logout');
};

export const deleteUser = async (): Promise<void> => {
  await instance.delete('/api/v1/users/me');
};
