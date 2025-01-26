import * as S from "@/components/common/Form.styled";
import { useNavigate } from "react-router";
import { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth(); // 수정: 실제 훅 이름에 맞춰 destructuring

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // handleLogin(아이디, 비밀번호)
      await handleLogin(userId, password);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Label htmlFor="id">아이디</S.Label>
        <S.Input
          type="text"
          id="id"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <S.Link href="#">비밀번호를 잊으셨나요?</S.Link>

        <S.Button type="submit">로그인</S.Button>

        <S.OutlineButton onClick={() => navigate("/register")}>
          회원가입 하러 가기
        </S.OutlineButton>
      </S.Form>
    </S.Container>
  );
}
