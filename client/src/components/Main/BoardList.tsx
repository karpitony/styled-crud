import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBoardList } from "@/services/boardService";
import { Board } from "@/models/board";
import BoardItem from "@/components/Main/BoardItem";

export default function Boardlist() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getBoardList();
        if (response.success) {
          if (response.data.length === 0) {
            setError('게시판 목록이 존재하지 않습니다.');
          }
          setBoards(response.data);
        } else {
          setError('게시판 목록을 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('게시판 목록 조회 중 에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Title>Board List</Title>
      <BoardGrid>
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </BoardGrid>
    </Container>
  );
}

// 스타일드 컴포넌트
const Container = styled.div`
  margin: 20px auto;
  max-width: 1200px;
  padding: 0 16px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  color: #333;
  text-align: center;
`;

const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  justify-content: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
