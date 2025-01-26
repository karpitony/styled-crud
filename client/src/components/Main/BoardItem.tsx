import { Board } from '@/models/board';
import * as S from './BoardItem.styled';

interface BoardItemProps {
  board: Board;
}

function BoardItem({ board }: BoardItemProps) {
  return (
    <S.Card>
      <S.BoardTitle>{board.name}</S.BoardTitle>
      <S.RouteText>경로: {board.route}</S.RouteText>
      <S.Description>{board.description}</S.Description>
      {/* 
        나중에 최신글 5개 등 추가 
        -> <RecentPosts> ... </RecentPosts> 
      */}
    </S.Card>
  );
}

export default BoardItem;
