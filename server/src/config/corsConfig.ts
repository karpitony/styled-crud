import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // React 앱의 도메인
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // 쿠키 허용
};

module.exports = () => cors(corsOptions); // 함수 반환
