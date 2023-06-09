import {Container} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import User from "../components/User";

function UserPage({isAuthenticated}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/unauthorized");
    }, [isAuthenticated]);
    return (
        <Container maxWidth="xl">
            <User/>
        </Container>
    );
}

export default UserPage;
