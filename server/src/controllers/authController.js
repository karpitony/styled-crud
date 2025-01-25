const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/userModel');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    try {
      // 중복 체크: 데이터베이스에서 username 검색
      const existingUser = await userModel.findUserByUsername(req.app.get('db'), username);
      if (existingUser) {
        return res.status(400).json({ error: '이미 존재하는 사용자명입니다.' });
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 데이터베이스에 유저 추가
      const userId = await userModel.createUser(req.app.get('db'), username, hashedPassword);
      res.status(201).json({ message: '회원가입 성공', id: userId });
    } catch (err) {
      res.status(500).json({ error: '회원가입 실패', details: err.message });
    }
  },

  // 로그인 로직
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const db = req.app.get('db');
      const user = await userModel.findUserByUsername(db, username);

      // 유저 존재 여부 확인
      if (!user) {
        return res.status(401).json({ error: '유효하지 않은 사용자명 또는 비밀번호' });
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: '유효하지 않은 사용자명 또는 비밀번호' });
      }

      // JWT 토큰 발급
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h', // 토큰 유효 기간 1시간
      });

      res.status(200).json({ message: '로그인 성공', token });
    } catch (err) {
      res.status(500).json({ error: '로그인 실패', details: err.message });
    }
  },
};
