import { Database } from 'sqlite3';

declare global {
  namespace Express {
    interface Application {
      get(key: 'db'): Database;
    }
    interface Request {
      user?: string | jwt.JwtPayload; 
    }
  }
}
