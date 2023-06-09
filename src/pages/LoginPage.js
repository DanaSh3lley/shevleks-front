import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

function LoginPage({ isAuthenticated }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
