import styled from 'styled-components';
import { Board } from '@/models/board';

interface BoardItemProps {
  board: Board;
}

function BoardItem({ board }: BoardItemProps) {
  return (
    <Card>
      <BoardTitle>{board.name}</BoardTitle>
      <RouteText>경로: {board.route}</RouteText>
      <Description>{board.description}</Description>
      {/* 
        나중에 최신글 5개 등 추가 
        -> <RecentPosts> ... </RecentPosts> 
      */}
    </Card>
  );
}

export default BoardItem;

// 스타일드 컴포넌트들
const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const BoardTitle = styled.h2`
  margin: 0 0 8px;
  color: #0066cc;
`;

const RouteText = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;
`;

const Description = styled.p`
  margin: 4px 0;
  color: #333;
`;
