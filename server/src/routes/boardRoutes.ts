import express from 'express';
import { getBoardList, createBoard } from '../controllers/boardController';
import authMiddleware from '../middlewares/authMiddleware'; // JWT 인증 미들웨어

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 게시판 관련 API
 */

/**
 * @swagger
 * /board:
 *   get:
 *     summary: 게시판 목록 조회
 *     tags: [Board]
 *     description: 모든 게시판의 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 게시판 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 게시판 목록 조회 성공
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: 공지사항
 *                       route:
 *                         type: string
 *                         example: notice
 *                       description:
 *                         type: string
 *                         example: 공지사항 게시판
 *       500:
 *         description: 서버 에러
 * 
 *   post:
 *     summary: 게시판 생성
 *     tags: [Board]
 *     description: JWT 인증을 거쳐 새 게시판을 생성합니다.
 *     security:
 *       - bearerAuth: []  # JWT 인증을 위한 swagger 설정 (swagger.ts에서 bearerAuth 추가 필요)
 *     requestBody:
 *       description: 게시판 생성에 필요한 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 자유게시판
 *               route:
 *                 type: string
 *                 example: free
 *               description:
 *                 type: string
 *                 example: 자유롭게 사용하는 게시판
 *     responses:
 *       201:
 *         description: 게시판 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 게시판 생성 성공
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 10
 *                     name:
 *                       type: string
 *                       example: 자유게시판
 *                     route:
 *                       type: string
 *                       example: free
 *                     description:
 *                       type: string
 *                       example: 자유롭게 사용하는 게시판
 *       400:
 *         description: 잘못된 요청 (필드 누락 등)
 *       401:
 *         description: 인증 실패
 *       409:
 *         description: 게시판 중복(이미 존재하는 name/route)
 *       500:
 *         description: 서버 에러
 */

router.get('/board', getBoardList); 
router.post('/board', authMiddleware, createBoard);

export default router;
