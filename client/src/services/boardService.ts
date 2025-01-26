import apiConfig from "@/config/apiConfig";
import { CreateBoardRequest } from "@/models/board";

export const getBoardList = async () => {
  const response = await apiConfig.get('/board');
  return response.data;
};

export const createBoard = async (data: CreateBoardRequest) => {
  const response = await apiConfig.post('/board', data);
  return response.data;
};
