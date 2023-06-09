import { Container } from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

function UpdateProfilePage({isAuthenticated}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/unauthorized");
    }, [isAuthenticated]);
  return (
    <Container>
      <UpdateProfileForm />
      <UpdatePasswordForm />
    </Container>
  );
}

export default UpdateProfilePage;
