import { RequestHandler } from 'express';
import { Database } from 'sqlite3';

export const getPostByIdHandler: RequestHandler = async (req, res) => {
  try {
    const db: Database = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const post_id = parseInt(req.params.post_id, 10);

    if (isNaN(post_id) || post_id <= 0) {
      res.status(400).json({ success: false, message: '유효한 post_id를 제공해야 합니다.' });
      return ;
    }

    db.get(`SELECT * FROM posts WHERE id = ?`, [post_id], (err, row) => {
      if (err) {
        console.error('게시글 단일 조회 중 에러:', err);
        res.status(500).json({ success: false, message: '서버 에러' });
        return ;
      }
      if (!row) {
        res.status(404).json({ success: false, message: '해당 게시글을 찾을 수 없습니다.' });
        return ;
      }

      res.status(200).json({ success: true, message: '게시글 조회 성공', data: row });
    return ;  }
  );
  } catch (error: any) {
    console.error('게시글 단일 조회 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    return ;
  }
};
