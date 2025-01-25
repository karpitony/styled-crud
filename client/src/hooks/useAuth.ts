import { useCallback, useEffect } from 'react';
import { login, refreshToken, registerUser } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { saveToken, removeToken, getToken } from '@/utils/storageUtils';
import { isTokenExpired } from '@/utils/jwtUtils';

export const useAuth = () => {
  const { token, setToken, clearToken } = useAuthStore();

  // 회원가입
  const handleRegister = useCallback(
    async (username: string, userId: string, password: string) => {
      try {
        const response = await registerUser({ 
          username, 
          user_id: userId, 
          password 
        });
        return response;
      } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
      }
    },
    []
  );

  const handleLogin = useCallback(
    async (user_id: string, password: string) => {
      const response = await login({ user_id, password });
      setToken(response.token);
      saveToken(response.token);
    },
    [setToken] 
  );

  const handleLogout = useCallback(
    async () => {
      clearToken();
      removeToken();
    },
    [clearToken]
  );

  const handleRefreshToken = useCallback(
    async () => {
      const response = await refreshToken();
      setToken(response.token);
      saveToken(response.token);
    },
    [setToken]
  );

  // 초기 로드 시 토큰 세팅
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
    } else {
      removeToken();
      clearToken();
    }
  }, [setToken, clearToken]);

  // 토큰 만료 시 리프레시 토큰 요청
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      handleRefreshToken().catch(() => {
        clearToken();
        removeToken();
      });
    }
  }, [token, handleRefreshToken, clearToken]);

  // 로그인 여부 판별
  const isAuthenticated = token ? !isTokenExpired(token) : false;

  return {
    token,
    isAuthenticated,
    handleRegister,
    handleLogin,
    handleLogout,
    handleRefreshToken,
  };
};
