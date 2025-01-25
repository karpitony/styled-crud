import express, { Response, Request } from 'express';
import dotenv from 'dotenv';

import corsConfig from './config/corsConfig';
import { connectDB } from './database/db';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(corsConfig());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 비동기 데이터베이스 연결 및 서버 시작
(async () => {
  try {
    const db = await connectDB();
    app.set('db', db); // 데이터베이스 객체를 전역으로 설정

    // 라우터
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello, world!');
    });
    
    app.use('/auth', authRoutes);

    // 에러 핸들러 (항상 마지막)
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('데이터베이스 연결 실패:', err);
    process.exit(1); // 연결 실패 시 서버 종료
  }
})();