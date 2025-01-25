import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// JWT_SECRET을 환경 변수에서 가져오기
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// JWT 디코딩 후 사용자 정보 타입 정의
interface DecodedToken {
  id: number;
  username: string;
  user_id: string;
}

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '인증 토큰이 없습니다.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken; // DecodedToken 타입 명시
    req.user = decoded; // 사용자 정보를 요청 객체에 저장
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: '토큰이 만료되었습니다.' });
    }
    // 다른 JWT 관련 오류 처리
    res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
  }
};
