import {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button as RegisterButton,
  OutlineButton,
} from "@/components/common/Form.styled";

export default function Register() {
  return (
    <Container>
      <Title>회원가입</Title>
      <Form>
        <Label htmlFor="id">아이디</Label>
        <Input type="text" id="id" placeholder="아이디를 입력하세요" />
        <Label htmlFor="nickname">닉네임</Label>
        <Input type="text" id="nickname" placeholder="닉네임을 입력하세요" />
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
        />
        <RegisterButton>회원가입</RegisterButton>
        <OutlineButton onClick={() => alert("로그인 페이지로 이동")}>
          로그인으로 돌아가기
        </OutlineButton>
      </Form>
    </Container>
  );
}
