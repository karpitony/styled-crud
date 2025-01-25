const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const cors = require('./src/config/corsConfig')();
const connectDB = require('./src/database/db');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 미들웨어
app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 데이터베이스 연결
(async () => {
  const db = await connectDB();
  app.set('db', db); // 데이터베이스 객체를 전역으로 설정
})();


// 라우터
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// 인증 라우터
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
