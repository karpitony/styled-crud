import { Database } from 'sqlite3';

// 게시판 타입 정의
export type Board = {
  id?: number;
  name: string;
  route: string;
  description?: string;
};

// 게시판 목록 조회
export async function getAllBoards(db: Database): Promise<Board[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, name, route, description FROM boards;`, (err, rows) => {
      if (err) return reject(err);
      resolve(rows as Board[]);
    });
  });
}

// 게시판 생성
export async function createBoard(db: Database, board: Board): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO boards (name, route, description) VALUES (?, ?, ?)`,
      [board.name, board.route, board.description],
      function (this: { lastID: number }, err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}
