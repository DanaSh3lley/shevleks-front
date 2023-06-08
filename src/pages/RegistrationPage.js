import RegistrationForm from "../components/RegistrationForm";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Container} from "@mui/system";

const RegistrationPage = ({isAuthenticated}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated)
            navigate('/')

    }, [isAuthenticated])

    return <Container><RegistrationForm/></Container>
}

export default RegistrationPage