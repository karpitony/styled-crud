import { Navigate } from 'react-router';

interface PrivateRouteProps {
  children: JSX.Element; // 보호할 컴포넌트(페이지)
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  // 인증 여부 판단 로직 (예: 로컬 스토리지 토큰 확인)
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;  // 토큰 존재 여부로 간단히 판단

  if (!isLoggedIn) {
    // 로그인 안 됨 -> /login 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 로그인됨 -> 원래 렌더링하려던 페이지 반환
  return children;
}
