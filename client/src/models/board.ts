// 보드 제작 요청 모델
export interface CreateBoardRequest {
  name: string;
  route: string;
  description: string;
}

// 보드 목록 응답 모델
export interface BoardListResponse {
  success: boolean,
  message: string,
  data: Board[]
}

// 보드 모델
export interface Board {
  id: number,
  name: string,
  route: string,
  description: string
}