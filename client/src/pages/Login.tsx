import {
  Container,
  Title,
  Form,
  Label,
  Input,
  Button as LoginButton,
  OutlineButton,
  Link as ForgotPassword,
} from "@/components/common/Form.styled";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>로그인</Title>
      <Form>
        <Label htmlFor="id">아이디</Label>
        <Input type="text" id="id" placeholder="아이디를 입력하세요" />
        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword>
        <LoginButton>로그인</LoginButton>
        <OutlineButton onClick={() => navigate("/register")}>
          회원가입 하러 가기
        </OutlineButton>
      </Form>
    </Container>
  );
}
