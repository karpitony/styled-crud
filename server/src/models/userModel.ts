import { Database } from 'sqlite3'; // sqlite3 Database 타입 가져오기

type User = {
  id?: number; // id는 선택적 (생성된 후 추가됨)
  username: string;
  password: string;
};


// username으로 유저 검색
export async function findUserByUsername(
  db: Database, 
  username: string
): Promise<User | undefined> 
{
  const query = `SELECT * FROM users WHERE username = ?`;
  return new Promise((resolve, reject) => {
    db.get(query, [username], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row as User); // row를 User 타입으로 반환
    });
  });
}

// 유저 생성
export async function createUser(
  db: Database,
  username: string,
  hashedPassword: string
): Promise<number> 
{
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [username, hashedPassword], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID); // 생성된 유저의 ID 반환
    });
  });
};
