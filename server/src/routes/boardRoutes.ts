import express from 'express';
import { 
  getBoardList,
  createBoardHandler, 
  getPostListByBoard 
} from '../controllers/boardController/index';
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
router.post('/board', authMiddleware, createBoardHandler);

/**
 * @swagger
 * /board/{board_id}:
 *   get:
 *     summary: 특정 게시판의 최신 게시글 목록 조회
 *     description: 특정 게시판의 최신 게시글 목록을 페이지네이션과 함께 조회합니다.
 *     tags:
 *       - Board
 *     parameters:
 *       - in: path
 *         name: board_id
 *         required: true
 *         description: "게시판의 ID"
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: "한 번에 가져올 게시글 개수 (기본값: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         required: false
 *         description: "가져올 페이지 번호 (기본값: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 가져옴
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
 *                   example: "게시글 목록 조회 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: "게시글 제목"
 *                           content:
 *                             type: string
 *                             example: "게시글 내용"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-01-29T12:34:56.000Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalPosts:
 *                           type: integer
 *                           example: 50
 *                         hasNextPage:
 *                           type: boolean
 *                           example: true
 *                         hasPrevPage:
 *                           type: boolean
 *                           example: false
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 board_id)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "유효한 board_id를 제공해야 합니다."
 *       404:
 *         description: 게시판에 게시글이 없는 경우
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
 *                   example: "해당 게시판에 게시글이 없습니다."
 *                 data:
 *                   type: array
 *                   example: []
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "서버 에러 발생"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/board/:board_id', getPostListByBoard);

export default router;
