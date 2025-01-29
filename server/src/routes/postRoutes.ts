import express from 'express';
import { getPostListByBoard } from '../controllers/postController';

const router = express.Router();

/**
 * @swagger
 * /posts/{board_id}:
 *   get:
 *     summary: 특정 게시판의 최신 게시글 목록 조회
 *     description: 특정 게시판의 최신 게시글 목록을 페이지네이션과 함께 조회합니다.
 *     tags:
 *       - Posts
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
router.get('/posts/:board_id', getPostListByBoard);

export default router;
