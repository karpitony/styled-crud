import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types/userTypes';
import dotenv from 'dotenv';

dotenv.config();

// JWT_SECRET을 환경 변수에서 가져오기
if (!process.env.JWT_SECRET) {
  throw new Error('🚨 JWT_SECRET 환경 변수가 설정되지 않았습니다!');
}
const JWT_SECRET = process.env.JWT_SECRET;

// Express.Request 확장 (req.user 추가)
declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedToken;
  }
}


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: '인증 토큰이 없습니다.' });
    return ;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ success: false, message: '토큰이 만료되었습니다.' });
      return ;
    }
    // 다른 JWT 관련 오류 처리
    res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
    return ;
  }
};

export default authMiddleware;
