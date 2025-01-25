// JWT Payload 타입 정의
interface JWTPayload {
  exp: number; // 만료 시간 (필수)
  iat?: number; // 발급 시간 (선택적)
  [key: string]: unknown; // 기타 사용자 정의 필드
}

export const decodeToken = (token: string): JWTPayload => {
  const payloadBase64 = token.split('.')[1];
  if (!payloadBase64) {
    throw new Error('Invalid token format');
  }

  const decodedPayload = atob(payloadBase64); // Base64 디코딩

  try {
    return JSON.parse(decodedPayload) as JWTPayload; // 타입 캐스팅
  } catch {
    throw new Error('Failed to parse token payload');
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload.exp) {
    throw new Error('Token does not have an exp field');
  }
  return Date.now() >= payload.exp * 1000; // 현재 시간과 비교
};
