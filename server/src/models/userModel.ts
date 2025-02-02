import { Database } from 'sqlite3'; // sqlite3 Database 타입 가져오기
import { User } from '../types/userTypes';


// user_id로 유저 검색
export async function findUserByUserID(
  db: Database, 
  user_id: string
): Promise<User | undefined> 
{
  const query = `SELECT * FROM users WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [user_id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row as User); // row를 User 타입으로 반환
    });
  });
};

// username으로 유저 검색
export async function findUserByUsername(
  db: Database, 
  username: string
): Promise<User | undefined> {
  const query = `SELECT * FROM users WHERE username = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [username], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row as User); // row를 User 타입으로 반환
    });
  });
};

// 유저 생성
export async function createUser(
  db: Database,
  username: string,
  user_id: string,
  hashedPassword: string
): Promise<string> 
{
  const query = `INSERT INTO users (username, user_id, password) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [username, user_id, hashedPassword], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(username); // 생성된 유저의 이름 반환
    });
  });
};
