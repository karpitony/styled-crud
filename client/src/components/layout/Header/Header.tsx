import { useState } from "react";
import { useNavigate } from "react-router";
import { Nav, DesktopUl, Li, LoginButton } from "./Header.styled";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const loginButtonOnClick = () => {
    navigate('/login');
    setIsLogin(!isLogin);
  };

  return (
    <Nav>
      <h1 onClick={() => navigate('/')}>{'< 간단 게시판 />'}</h1>
      <DesktopUl>
        <Li><a href="/">메인</a></Li>
        <Li><a href="/post-list">전체글 보기</a></Li>
        <Li><a href="/post-write">글쓰기</a></Li>
        {isLogin && <Li><a href="/mypage">마이페이지</a></Li>}
      </DesktopUl>
      <LoginButton onClick={loginButtonOnClick}>
        {isLogin ? '로그아웃' : '로그인'}
      </LoginButton>
    </Nav>
  );
}
