import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUserID } from '../models/userModel';

// 환경 변수에서 JWT 비밀키 가져오기
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// 요청 바디 타입 정의
interface AuthRequestBody {
  username: string;
  user_id: string; // 로그인, 마이페이지 라우트에 사용할 ID
  password: string;
}

// 회원가입
export const register: RequestHandler = async (req, res) => {
  try {
    const { username, user_id, password } = req.body as AuthRequestBody;

    // 입력 값 유효성 검사
    if (!username || !user_id|| !password || password.length < 6) {
      res.status(400).json({
        success: false,
        message: '사용자명, 로그인용 ID, 6자 이상의 비밀번호를 입력하세요.',
      });
      return; // 여기서 함수 종료
    }

    const db = req.app.get('db');
    const existingUser = await findUserByUserID(db, user_id);

    // 중복 사용자 확인
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: '이미 존재하는 사용자명입니다.',
      });
      return;
    }

    // 비밀번호 해싱 및 사용자 등록
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await createUser(db, username, user_id, hashedPassword);

    res.status(201).json({
      success: true,
      message: '회원가입 성공',
      id: newUserId,
    });
  } catch (err: any) {
    console.error('회원가입 에러:', err.message);
    res.status(500).json({
      success: false,
      message: '회원가입 실패',
      error: err.message,
    });
  }
};

// 로그인
export const login: RequestHandler = async (req, res) => {
  try {
    const { user_id, password } = req.body as AuthRequestBody;

    // 입력 값 유효성 검사
    if (!user_id || !password) {
      res.status(400).json({
        success: false,
        message: '사용자명과 비밀번호를 입력하세요.',
      });
      return;
    }

    const db = req.app.get('db');
    const user = await findUserByUserID(db, user_id);

    // 사용자 확인
    if (!user) {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 사용자명 또는 비밀번호',
      });
      return;
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 사용자명 또는 비밀번호',
      });
      return;
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' } // 토큰 유효 기간
    );

    res.status(200).json({
      success: true,
      message: '로그인 성공',
      token,
    });
  } catch (err: any) {
    console.error('로그인 에러:', err.message);
    res.status(500).json({
      success: false,
      message: '로그인 실패',
      error: err.message,
    });
  }
};
