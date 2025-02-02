import { RequestHandler } from 'express';
import { deletePost } from '../../models/postModel';

export const deletePostHandler: RequestHandler = async (req: any, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const post_id = parseInt(req.params.post_id, 10);
    const user_id = req.user?.id; // JWT에서 인증된 사용자 ID 가져오기

    if (!user_id) {
      res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
      return ;
    }

    if (!post_id) {
      res.status(400).json({ success: false, message: 'post_id는 필수입니다.' });
      return ;
    }

    const success = await deletePost(db, post_id, user_id);

    if (!success) {
      res.status(403).json({ success: false, message: '게시글 삭제 실패 (권한이 없거나 존재하지 않는 게시글)' });
      return ;
    }

    res.status(200).json({ success: true, message: '게시글 삭제 성공' });
    return ;
    
  } catch (error: any) {
    console.error('게시글 삭제 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    return ;
  }
};
