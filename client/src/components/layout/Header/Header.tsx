import { useNavigate } from "react-router";
import * as S from "./Header.styled";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <S.Nav>
      <h1 onClick={() => navigate('/')}>{'< 간단 게시판 />'}</h1>
      <S.DesktopUl>
        <S.Li><a href="/">메인</a></S.Li>
        <S.Li><a href="/post-list">전체글 보기</a></S.Li>
        <S.Li><a href="/post-write">글쓰기</a></S.Li>
        {isAuthenticated && <S.Li><a href="/mypage">마이페이지</a></S.Li>}
      </S.DesktopUl>

      {/* 삼항 연산자로 두 개의 버튼 중 하나만 노출 */}
      {isAuthenticated ? (
        <S.LoginButton onClick={handleLogout}>로그아웃</S.LoginButton>
      ) : (
        <S.LoginButton onClick={() => navigate('/login')}>로그인</S.LoginButton>
      )}
    </S.Nav>
  );
}