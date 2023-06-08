import RegistrationForm from "../components/RegistrationForm";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Container} from "@mui/system";
import ResetPasswordPage from "./ResetPasswordPage";
import ResetPasswordForm from "../components/ResetPasswordForm";

const RegistrationPage = ({isAuthenticated}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated)
            navigate('/')

    }, [isAuthenticated])

    return <Container><ResetPasswordForm/></Container>
}

export default RegistrationPage