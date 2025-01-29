import BoardList from "@/components/Main/BoardList";
import CreateBoardButton from "@/components/Main/CreateBoardButton";

export default function MainPage() {
  return (
    <div>
      <BoardList />
      <CreateBoardButton />
    </div>
  );
}