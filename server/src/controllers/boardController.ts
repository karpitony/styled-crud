import { RequestHandler } from 'express';

/**
 * 게시판 목록 조회
 */
export const getBoardList: RequestHandler = async (req, res) => {
  try {
    // DB 객체 가져오기
    const db = req.app.get('db');
    if (!db) {
      res.status(500).json({
        success: false,
        message: 'DB 연결 정보가 없습니다.',
      });
      return ;
    }

    // boards 테이블에서 조회
    const query = `SELECT id, name, route, description FROM boards;`;

    // SQLite의 db.all() 사용
    return db.all(query, (err: Error, rows: any[]) => {
      if (err) {
        console.error('게시판 목록 조회 에러:', err);
        res.status(500).json({
          success: false,
          message: '게시판 목록 조회 실패',
          error: err.message,
        });
        return ;
      }

      // 정상 응답
      res.status(200).json({
        success: true,
        message: '게시판 목록 조회 성공',
        data: rows,
      });
      return ;
    });
  } catch (error: any) {
    console.error('게시판 목록 조회 중 에러:', error.message);
    res.status(500).json({
      success: false,
      message: '서버 에러',
      error: error.message,
    });
    return ;
  }
};

/**
 * 게시판 생성 (JWT 인증 필요)
 */
export const createBoard: RequestHandler = (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) {
      res.status(500).json({
        success: false,
        message: 'DB 연결 정보가 없습니다.',
      });
      return ;
    }

    const { name, route, description } = req.body;

    // 간단한 유효성 검사
    if (!name || !route) {
      res.status(400).json({
        success: false,
        message: 'name, route는 필수입니다.',
      });
      return ;
    }

    // boards 테이블에 INSERT
    const query = `INSERT INTO boards (name, route, description) VALUES (?, ?, ?)`;

    // getBoardList와 유사하게 callback 스타일로 처리
    return db.run(query, [name, route, description], function (this: { lastID: number }, err: any) {
      if (err) {
        console.error('게시판 생성 에러:', err);

        // name, route 둘 중 하나가 UNIQUE 위반인 경우
        if (err.message.includes('UNIQUE')) {
          res.status(409).json({
            success: false,
            message: '이미 존재하는 게시판 이름(name) 또는 경로(route)입니다.',
            error: err.message,
          });
          return ;
        }

        // 기타 에러
        res.status(500).json({
          success: false,
          message: '게시판 생성 실패',
          error: err.message,
        });
        return ;
      }

      // 정상 생성 -> this.lastID로 새 게시판 id 조회 가능
      const insertedId = this.lastID; // function() 콜백 안에서만 this.lastID 사용 가능
      res.status(201).json({
        success: true,
        message: '게시판 생성 성공',
        data: {
          id: insertedId,
          name,
          route,
          description,
        },
      });
      return ;
    });
  } catch (error: any) {
    console.error('게시판 생성 중 에러:', error);
    res.status(500).json({
      success: false,
      message: '서버 에러',
      error: error.message,
    });
    return ;
  }
};
