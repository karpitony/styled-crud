import { RequestHandler } from 'express';
import { getAllBoards } from '../../models/boardModel';

// 게시판 목록 조회
export const getBoardList: RequestHandler = async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const boards = await getAllBoards(db);
    res.status(200).json({
      success: true,
      message: '게시판 목록 조회 성공',
      data: boards,
    });
  } catch (error: any) {
    console.error('게시판 목록 조회 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
  }
};

