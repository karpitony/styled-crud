const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// 환경 변수에서 JWT 비밀키 가져오기
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  // 회원가입
  async register(req, res) {
    const { username, password } = req.body;

    // 입력 값 유효성 검사
    if (!username || !password || password.length < 6) {
      return res.status(400).json({ success: false, message: '사용자명과 6자 이상의 비밀번호를 입력하세요.' });
    }

    try {
      // 중복 체크: 데이터베이스에서 username 검색
      const db = req.app.get('db');
      const existingUser = await userModel.findUserByUsername(db, username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: '이미 존재하는 사용자명입니다.' });
      }

      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 데이터베이스에 유저 추가
      const userId = await userModel.createUser(db, username, hashedPassword);
      res.status(201).json({ success: true, message: '회원가입 성공', id: userId });
    } catch (err) {
      res.status(500).json({ success: false, message: '회원가입 실패', error: err.message });
    }
  },

  // 로그인
  async login(req, res) {
    const { username, password } = req.body;

    // 입력 값 유효성 검사
    if (!username || !password) {
      return res.status(400).json({ success: false, message: '사용자명과 비밀번호를 입력하세요.' });
    }

    try {
      const db = req.app.get('db');
      const user = await userModel.findUserByUsername(db, username);

      // 유저 존재 여부 확인
      if (!user) {
        return res.status(401).json({ success: false, message: '유효하지 않은 사용자명 또는 비밀번호' });
      }

      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: '유효하지 않은 사용자명 또는 비밀번호' });
      }

      // JWT 토큰 발급
      const token = jwt.sign(
        { id: user.id, username: user.username }, // 페이로드
        JWT_SECRET, // 비밀키
        { expiresIn: '1h' } // 토큰 유효 기간 1시간
      );

      res.status(200).json({ success: true, message: '로그인 성공', token });
    } catch (err) {
      res.status(500).json({ success: false, message: '로그인 실패', error: err.message });
    }
  },
};
