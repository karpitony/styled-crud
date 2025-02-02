import { RequestHandler } from 'express';
import { updatePost } from '../../models/postModel';

export const updatePostHandler: RequestHandler = async (req: any, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const { post_id, title, content } = req.body;
    const user_id = req.user?.id; // JWT에서 인증된 사용자 ID 가져오기

    if (!user_id) {
      res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
      return ;
    }

    if (!post_id || !title || !content) {
      res.status(400).json({ success: false, message: 'post_id, title, content는 필수입니다.' });
      return ;
    }

    const success = await updatePost(db, post_id, user_id, title, content);

    if (!success) {
      res.status(403).json({ success: false, message: '게시글 수정 실패 (권한이 없거나 존재하지 않는 게시글)' });
      return ;
    }

    res.status(200).json({ success: true, message: '게시글 수정 성공' });
    return ;}
   catch (error: any) {
    console.error('게시글 수정 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    return ;
  }
};
