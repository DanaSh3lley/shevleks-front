import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/system";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

function RegistrationPage({ isAuthenticated }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <Container>
      <ForgotPasswordForm />
    </Container>
  );
}

export default RegistrationPage;
