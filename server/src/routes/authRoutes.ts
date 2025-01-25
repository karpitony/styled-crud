import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원가입 및 로그인 관련 API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       description: 회원가입 시 필요한 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청 (입력값 부족 혹은 규칙 위반)
 *       500:
 *         description: 서버 에러
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       description: 로그인 시 필요한 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: 로그인 성공 (토큰 발급)
 *       400:
 *         description: 잘못된 요청 (입력값 부족)
 *       401:
 *         description: 인증 실패 (아이디 또는 비밀번호 불일치)
 *       500:
 *         description: 서버 에러
 */
router.post('/login', login);

export default router;