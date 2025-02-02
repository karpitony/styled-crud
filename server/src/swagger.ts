import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My TypeScript Express API',
      version: '1.0.0',
      description: 'Node.js + Express + TypeScript + Swagger 연동 예시'
    },
    servers: [
      {
        url: 'http://localhost:8000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',      // http
          scheme: 'bearer',  // bearer
          bearerFormat: 'JWT' // (옵션) JWT 토큰 형식 명시
        }
      }
    }
  },
  // JSDoc 주석이 들어있는 파일 경로
  apis: [
    path.join(__dirname, 'routes', '*.ts'), // 라우트 폴더를 스캔
    // 필요하면 다른 경로도 추가
  ]
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);
