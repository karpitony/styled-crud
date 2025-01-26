import React, { useState } from 'react';
import { createBoard } from '@/services/boardService';
import * as S from './CreateBoard.styled';

// 보드 생성에 필요한 필드
interface CreateBoardFields {
  name: string;
  route: string;
  description: string;
}

function CreateBoard() {
  const [formData, setFormData] = useState<CreateBoardFields>({
    name: '',
    route: '',
    description: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await createBoard(formData);
      // 예: { success: true, data: { id: 10, name, route, ... } }
      if (response.success) {
        setSuccess('게시판이 성공적으로 생성되었습니다!');
        // 필요 시, 목록 페이지 리다이렉트 등
      } else {
        setError('게시판 생성에 실패했습니다.');
      }
    } catch (err: unknown) {
      console.error(err);
      setError('오류가 발생했습니다.');
    }
  };

  return (
    <S.FormContainer>
      <S.Title>게시판 생성</S.Title>
      {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '8px' }}>{success}</div>}

      <S.Form onSubmit={handleSubmit}>
        <S.Label htmlFor="name">게시판 이름</S.Label>
        <S.Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="예) 자유게시판"
        />

        <S.Label htmlFor="route">URL 경로</S.Label>
        <S.Input
          id="route"
          name="route"
          value={formData.route}
          onChange={handleChange}
          placeholder="예) free"
        />

        <S.Label htmlFor="description">설명</S.Label>
        <S.Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="게시판에 대한 간단한 설명"
        />

        <S.SubmitButton type="submit">게시판 생성</S.SubmitButton>
      </S.Form>
    </S.FormContainer>
  );
}

export default CreateBoard;
