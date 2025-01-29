// 유저 기본 타입
export interface User {
  id?: number; // id는 선택적 (생성된 후 추가됨)
  username: string;
  user_id: string; // 로그인, 마이페이지 라우트에 사용할 ID
  password: string;
}

// 인증 요청 바디 타입
export interface AuthRequestBody {
  username?: string; // 회원가입 시 필요 (로그인 시 불필요)
  user_id: string; // 로그인용 ID
  password: string;
}

// JWT 토큰 페이로드 타입
export interface DecodedToken {
  id: number; // DB에서 자동 증가된 ID
  user_id: string; // 유저의 로그인용 ID
}
