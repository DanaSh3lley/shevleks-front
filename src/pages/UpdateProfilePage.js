import RegistrationForm from "../components/RegistrationForm";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Container} from "@mui/system";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const UpdateProfilePage = () => {
    return <Container><UpdateProfileForm/><UpdatePasswordForm/></Container>
}

export default UpdateProfilePage