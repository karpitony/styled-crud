import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // React Vite 앱의 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // 쿠키 허용
};

const corsConfig = () => cors(corsOptions); // 함수 반환
export default corsConfig;
