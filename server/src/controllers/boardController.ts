import { RequestHandler } from 'express';
import { getAllBoards, createBoard } from '../models/boardModel';

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

// 게시판 생성 (JWT 인증 필요)
export const createBoardHandler: RequestHandler = async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) throw new Error('DB 연결 정보가 없습니다.');

    const { name, route, description } = req.body;
    if (!name || !route) {
      res.status(400).json({ success: false, message: 'name, route는 필수입니다.' });
      return;
    }

    const boardId = await createBoard(db, { name, route, description });
    res.status(201).json({
      success: true,
      message: '게시판 생성 성공',
      data: { id: boardId, name, route, description },
    });
  } catch (error: any) {
    console.error('게시판 생성 중 에러:', error);
    res.status(500).json({ success: false, message: '서버 에러', error: error.message });
  }
};
