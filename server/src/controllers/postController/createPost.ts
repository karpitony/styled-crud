import { RequestHandler } from 'express';
import { createPost } from '../../models/postModel';
import authMiddleware from '../../middlewares/authMiddleware';

export const createPostHandler: RequestHandler = async (req: any, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const { board_id, title, content } = req.body;
    const user_id = req.user?.id; // ✅ JWT에서 인증된 사용자 ID 가져오기

    if (!user_id) {
      res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
      return ;
    }

    if (!board_id || !title || !content) {
      res.status(400).json({ success: false, message: 'board_id, title, content는 필수입니다.' });
      return ;
    }

    const postId = await createPost(db, board_id, user_id, title, content);

    res.status(201).json({ success: true, message: '게시글 작성 성공', data: { id: postId } });
    return ;}
   catch (error: any) {
    console.error('게시글 작성 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    return ;
  }
};
