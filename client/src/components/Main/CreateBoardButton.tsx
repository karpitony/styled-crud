import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import * as S from "./CreateBoardButton.styled";

export default function CreateBoardButton() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <S.ButtonContainer>
      <S.Message>원하는 게시판이 없으신가요? 지금 만들러 가세요!</S.Message>
      <S.CreateButton onClick={() => navigate("/create-board")}>
        게시판 생성
      </S.CreateButton>
    </S.ButtonContainer>
  );
}