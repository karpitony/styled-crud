// 로그인 요청 타입
export interface LoginRequest {
  username: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
  };
}

// 리프레시 토큰 응답 타입
export interface RefreshTokenResponse {
  token: string;
}

// 회원가입 요청에 필요한 타입
export interface RegisterRequest {
  username: string;
  user_id: string;
  password: string;
}

// 회원가입 응답(201) 시 받을 수 있는 타입
export interface RegisterResponse {
  success: boolean;
  message: string;
  id?: number; // 생성된 사용자 ID
}