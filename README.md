[![My Skills](https://skillicons.dev/icons?i=js,ts,react,styledcomponents,nodejs,express,sqlite)](https://skillicons.dev)

# Styled-Component와 CRUD 연습 게시판 프로젝트

## 서버

### 서버 폴더구조
```
project-root/
├── app.js                   // Express 서버 설정
├── database/
│   ├── my-database.db       // SQLite 데이터베이스 파일
│   └── db.js                // 데이터베이스 연결 로직
├── models/
│   ├── userModel.js         // 유저 모델
│   ├── postModel.js         // 게시글 모델
│   └── commentModel.js      // 댓글 모델
├── routes/
│   ├── authRoutes.js        // 인증 관련 라우터
│   ├── postRoutes.js        // 게시글 관련 라우터
│   └── commentRoutes.js     // 댓글 관련 라우터
├── controllers/
│   ├── authController.js    // 인증 비즈니스 로직
│   ├── postController.js    // 게시글 비즈니스 로직
│   └── commentController.js // 댓글 비즈니스 로직
├── middlewares/
│   ├── authMiddleware.js    // 인증 미들웨어 (JWT)
│   └── errorHandler.js      // 에러 핸들링 미들웨어
├── config/
│   └── corsConfig.js        // CORS 설정
├── utils/
│   └── hashPassword.js      // 비밀번호 해싱 유틸리티
├── package.json             // 프로젝트 설정
└── README.md                // 프로젝트 설명
```

### 서버 트러블 슈팅
#### 처음 시작하는 node.js여서 고민되는 폴더구조
- model과 controller의 분리여부
- 미들웨어의 사용 이유와 사용 시점

#### jwt에 포함해야할 정보와 넣지 말아야 할 정보
- 처음엔 로그인시 사용하는 id도 함께 포함하려 했으나, 보안상 이유로 db에서 부여한 id와 username만 삽입