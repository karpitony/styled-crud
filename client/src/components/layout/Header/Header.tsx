import { useNavigate } from "react-router";
import { Nav, DesktopUl, Li, LoginButton } from "./Header.styled";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <Nav>
      <h1 onClick={() => navigate('/')}>{'< 간단 게시판 />'}</h1>
      <DesktopUl>
        <Li><a href="/">메인</a></Li>
        <Li><a href="/post-list">전체글 보기</a></Li>
        <Li><a href="/post-write">글쓰기</a></Li>
        {isAuthenticated && <Li><a href="/mypage">마이페이지</a></Li>}
      </DesktopUl>

      {/* 삼항 연산자로 두 개의 버튼 중 하나만 노출 */}
      {isAuthenticated ? (
        <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
      ) : (
        <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
      )}
    </Nav>
  );
}