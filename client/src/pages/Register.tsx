import * as S from "@/components/common/Form.styled";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const { handleRegister } = useAuth();

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 & 비밀번호 확인이 같은지 체크
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // handleRegister(닉네임, 로그인용 아이디, 비밀번호)
      const response = await handleRegister(username, userId, password);
      if (response.success) {
        alert(`회원가입이 완료되었습니다! (ID: ${response.id})`);
        // 가입 후 로그인 페이지로 이동 (또는 메인 페이지 이동 등)
        window.location.href = '/login';
      }
    } catch {
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Label htmlFor="id">아이디</S.Label>
        <S.Input
          type="text"
          id="id"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <S.Label htmlFor="nickname">닉네임</S.Label>
        <S.Input
          type="text"
          id="nickname"
          placeholder="닉네임을 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <S.Label htmlFor="password">비밀번호</S.Label>
        <S.Input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
        <S.Input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <S.Button type="submit">회원가입</S.Button>
        <S.OutlineButton onClick={() => alert("로그인 페이지로 이동")}>
          로그인으로 돌아가기
        </S.OutlineButton>
      </S.Form>
    </S.Container>
  );
}
