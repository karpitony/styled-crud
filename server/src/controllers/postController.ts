import { RequestHandler } from 'express';
import { getPostsByBoard, getTotalPostCountByBoard } from '../models/postModel';

// 특정 게시판의 최신 게시글 목록 조회 (페이지네이션 포함)
export const getPostListByBoard: RequestHandler = async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const board_id = parseInt(req.params.board_id, 10);
    const limit = parseInt(req.query.limit as string, 10) || 10; // 기본값 10개
    const page = parseInt(req.query.page as string, 10) || 1; // 기본값 1페이지
    const offset = (page - 1) * limit;

    if (isNaN(board_id) || board_id <= 0) {
      res.status(400).json({
        success: false,
        message: '유효한 board_id를 제공해야 합니다.'
      });
      return ;
    }

    const posts = await getPostsByBoard(db, board_id, limit, offset);
    const totalPosts = await getTotalPostCountByBoard(db, board_id);
    const totalPages = Math.ceil(totalPosts / limit);

    if (totalPosts === 0) {
      res.status(404).json({
        success: true,
        message: '해당 게시판에 게시글이 없습니다.',
        data: [],
      });
      return ;
    }

    res.status(200).json({
      success: true,
      message: '게시글 목록 조회 성공',
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
    return ;
  } catch (error: any) {
    console.error('게시글 목록 조회 중 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 에러',
      error: error.message || "Internal Server Error" 
    });
    return ;
  }
};
