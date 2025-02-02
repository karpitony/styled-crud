import { Database } from 'sqlite3';

type Post = {
  id: number;
  board_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
};

// 특정 게시판의 최신 글 목록 조회 (페이지네이션 포함)
export async function getPostsByBoard(
  db: Database,
  board_id: number,
  limit: number,
  offset: number = 0
): Promise<Post[]> {
  const query = `
    SELECT * FROM posts
    WHERE board_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [board_id, limit, offset], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows as Post[]);
    });
  });
}

// 특정 게시판의 총 게시글 개수 조회 (페이지네이션에 활용)
export async function getTotalPostCountByBoard(
  db: Database,
  board_id: number
): Promise<number> {
  const query = `SELECT COUNT(*) as count FROM posts WHERE board_id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [board_id], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (!row) {
        return resolve(0); // 게시글이 없는 경우 0
      }
      const { count } = row as { count: number };
      resolve(count);
    });
  });
}

// 게시글 작성
export async function createPost(
  db: Database,
  board_id: number,
  user_id: number,
  title: string,
  content: string
): Promise<number> {
  const query = `
    INSERT INTO posts (board_id, user_id, title, content)
    VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [board_id, user_id, title, content], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.lastID); // 생성된 게시글의 ID 반환
    });
  });
}

// 게시글 수정
export async function updatePost(
  db: Database,
  post_id: number,
  user_id: number, // 본인만 수정 가능하도록 검증
  title: string,
  content: string
): Promise<boolean> {
  const query = `
    UPDATE posts
    SET title = ?, content = ?
    WHERE id = ? AND user_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [title, content, post_id, user_id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes > 0); // 수정된 행이 있으면 true 반환
    });
  });
}

// 게시글 삭제
export async function deletePost(
  db: Database,
  post_id: number,
  user_id: number // 본인만 삭제 가능하도록 검증
): Promise<boolean> {
  const query = `
    DELETE FROM posts
    WHERE id = ? AND user_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(query, [post_id, user_id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes > 0); // 삭제된 행이 있으면 true 반환
    });
  });
}