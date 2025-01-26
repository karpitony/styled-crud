import { Database } from 'sqlite3';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../../middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Application {
      get(key: 'db'): Database;
    }

    interface Request {
      user?: DecodedToken | string | jwt.JwtPayload;
    }
  }
}

export {};
