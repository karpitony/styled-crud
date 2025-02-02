import express from 'express';
import {
  createPostHandler,
  getPostListByBoard,
  updatePostHandler,
  deletePostHandler,
  getPostByIdHandler,
} from '../controllers/postController/index';

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

/**
 * @swagger
 * /posts/{post_id}:
 *   get:
 *     summary: 게시글 단일 조회
 *     description: 특정 게시글을 단일로 조회합니다.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: "조회할 게시글 ID"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 단일 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     board_id:
 *                       type: integer
 *                       example: 2
 *                     user_id:
 *                       type: integer
 *                       example: 3
 *                     title:
 *                       type: string
 *                       example: "게시글 제목"
 *                     content:
 *                       type: string
 *                       example: "게시글 내용"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-30T15:25:00.000Z"
 *       404:
 *         description: 게시글을 찾을 수 없음
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
 *                   example: "해당 게시글을 찾을 수 없습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get('/:post_id', getPostByIdHandler);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글 작성
 *     description: 새 게시글을 작성합니다. (로그인 필요)
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - board_id
 *               - title
 *               - content
 *             properties:
 *               board_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "새로운 게시글 제목"
 *               content:
 *                 type: string
 *                 example: "새로운 게시글 내용"
 *     responses:
 *       201:
 *         description: 게시글 작성 성공
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
 *                   example: "게시글 작성 성공"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: 요청 바디가 잘못되었거나 필수 항목이 누락됨
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
 *                   example: "board_id, title, content는 필수입니다."
 *       401:
 *         description: 인증 실패 (로그인 안됨)
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
 *                   example: "로그인이 필요합니다."
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
 *                 error:
 *                   type: string
 */
router.post('/', createPostHandler);

/**
 * @swagger
 * /posts:
 *   put:
 *     summary: 게시글 수정
 *     description: 기존 게시글을 수정합니다. 본인만 수정 가능.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - title
 *               - content
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "수정된 게시글 제목"
 *               content:
 *                 type: string
 *                 example: "수정된 게시글 내용"
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
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
 *                   example: "게시글 수정 성공"
 *       400:
 *         description: 요청 바디가 잘못되었거나 필수 항목이 누락됨
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
 *                   example: "post_id, title, content는 필수입니다."
 *       401:
 *         description: 인증 실패 (로그인 안됨)
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
 *                   example: "로그인이 필요합니다."
 *       403:
 *         description: 권한 없음 or 존재하지 않는 게시글
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
 *                   example: "게시글 수정 실패 (권한이 없거나 존재하지 않는 게시글)"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put('/', updatePostHandler);

/**
 * @swagger
 * /posts:
 *   delete:
 *     summary: 게시글 삭제
 *     description: 게시글을 삭제합니다. 본인만 삭제 가능.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
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
 *                   example: "게시글 삭제 성공"
 *       400:
 *         description: 요청 바디가 잘못되었거나 필수 항목 누락
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
 *                   example: "post_id는 필수입니다."
 *       401:
 *         description: 인증 실패 (로그인 안됨)
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
 *                   example: "로그인이 필요합니다."
 *       403:
 *         description: 권한 없음 or 존재하지 않는 게시글
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
 *                   example: "게시글 삭제 실패 (권한이 없거나 존재하지 않는 게시글)"
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete('/', deletePostHandler);

export default router;
