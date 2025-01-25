import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // 에러 로그 출력
  res.status(500).json({ error: '서버 에러 발생' }); // 500 에러 응답
};

export default errorHandler;
