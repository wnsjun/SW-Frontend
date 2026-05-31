export interface LoginRequest {
  routinerId: string;
  password: string;
}

export interface SignupRequest {
  routinerId: string;
  nickname: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupResponse {
  routinerId: string;
  nickname: string;
}
