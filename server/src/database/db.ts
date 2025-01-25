import sqlite3 from 'sqlite3';
import path from 'path';

export function connectDB() {
  const db = new sqlite3.Database(
    path.join(__dirname, 'my-database.db'),
    (err: any) => {
      if (err) {
        console.error('데이터베이스 연결 실패:', err.message);
      } else {
        console.log('sqlite3로 데이터베이스 연결 성공');
      }
    }
  );

  // 테이블 생성
  db.serialize(() => {
    // 유저 테이블
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // 게시판 테이블
    db.run(`
      CREATE TABLE IF NOT EXISTS boards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT
      );
    `);

    // 게시글 테이블
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        board_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (board_id) REFERENCES boards(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // 댓글 테이블
    db.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // 좋아요 테이블
    db.run(`
      CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER,
        comment_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, post_id, comment_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id)
      );
    `);

    console.log('모든 테이블 초기화 완료!');
  });

  return db;
}
