import axios from 'axios';

const apiConfig = axios.create({
  baseURL: 'http://localhost:8000/', // API 기본 URL
  timeout: 5000, // 요청 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (JWT 토큰 추가)
apiConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiConfig;
