import LoginForm from "../components/LoginForm";
import {Container} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginPage = ({isAuthenticated}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated)
            navigate('/')

    }, [isAuthenticated])

    return <Container>
        <LoginForm/>
    </Container>
}

export default LoginPage