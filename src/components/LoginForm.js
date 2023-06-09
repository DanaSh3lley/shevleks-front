import React, {useState} from "react";
import {Button, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {login} from "../actions/userActions";
import LoadingComponent from "./Loading";

const FormContainer = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    maxWidth: "400px",
    margin: "0 auto",
});

const InputField = styled(TextField)({
    marginBottom: "16px",
});

const ErrorText = styled(Typography)({
    color: "red",
    marginBottom: "16px",
});

const SubmitButton = styled(Button)({
    marginTop: "16px",
    color: "white",
});

const Title = styled(Typography)({
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
});

const Description = styled(Typography)({
    fontSize: "16px",
    marginBottom: "16px",
});

function LoginForm() {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.user.loading)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const error = useSelector((state) => state.user.error);

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = {email, password};
        dispatch(login(credentials));
    };

    return isLoading ? (
            <LoadingComponent/>
        ) :
        <FormContainer onSubmit={handleSubmit}>
            <Title>Логін</Title>
            <Description>Введіть ваші дані для авторизації.</Description>
            <InputField
                label="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error && (
                <ErrorText variant="body1" color="error" gutterBottom>
                    {error}
                </ErrorText>
            )}
            <SubmitButton type="submit" variant="contained" color="primary">
                Login
            </SubmitButton>
            <Button
                type="button"
                variant="text"
                color="primary"
                onClick={() => navigate("/forgot")}
            >
                Забули пароль?
            </Button>
        </FormContainer>
}

export default LoginForm;
