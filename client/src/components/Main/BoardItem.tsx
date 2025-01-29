import { Board } from '@/models/board';
import { useNavigate } from 'react-router';
import * as S from './BoardItem.styled';

interface BoardItemProps {
  board: Board;
}

function BoardItem({ board }: BoardItemProps) {
  const navigate = useNavigate();

  return (
    <S.Card>
      <S.TitleRouteContainer
        onClick={() => navigate(`/board/${board.route}`)}
        style={{ cursor: 'pointer' }}
      >
        <S.BoardTitle>{board.name}</S.BoardTitle>
        <S.RouteText>
          /board/<S.RouteBold>{board.route}</S.RouteBold>
        </S.RouteText>
      </S.TitleRouteContainer>
      {/* 
        나중에 최신글 5개 등 추가 
        -> <RecentPosts> ... </RecentPosts> 
      */}
    </S.Card>
  );
}

export default BoardItem;
