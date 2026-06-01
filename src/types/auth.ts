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
  status: number;
  code: string;
  message: string;
  data: {
    token: {
      accessToken: string;
    };
    nickname: string;
  };
}

export interface SignupResponse {
  routinerId: string;
  nickname: string;
}
