import { instance } from './instance';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth';

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>('/api/v1/auth/login', data);
  const authHeader = res.headers['authorization'] as string | undefined;
  if (authHeader) {
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    localStorage.setItem('accessToken', token);
  }
  return res.data;
};

export const postSignup = async (data: SignupRequest): Promise<SignupResponse> => {
  const res = await instance.post<SignupResponse>('/api/v1/auth/signup', data);
  return res.data;
};
