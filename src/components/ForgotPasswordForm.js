import React, {useState} from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from "../actions/userActions";
import {styled} from '@mui/system';

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    maxWidth: '400px',
    margin: '0 auto',
});

const InputField = styled(TextField)({
    marginBottom: '16px',
});

const ErrorText = styled(Typography)({
    color: 'red',
    marginBottom: '16px',
});

const SubmitButton = styled(Button)({
    marginTop: '16px',
    color: 'white'
});

const Title = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
});

const Description = styled(Typography)({
    fontSize: '16px',
    marginBottom: '16px',
});

const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const forgotSuccess = useSelector(state => state.user.forgotSuccess)

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
        };
        dispatch(forgotPassword(userData));
    };
    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Forgot Password</Title>
            <Description>Enter your email to reset your password</Description>
            <InputField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {forgotSuccess === false && (
                <ErrorText variant="body2" color="error" gutterBottom>
                    Щось пішло не так
                </ErrorText>
            )}
            {forgotSuccess && (
                <Typography variant="body2" color="primary" gutterBottom>
                    Відправлено!
                </Typography>
            )}
            <SubmitButton type="submit" variant="contained" color="primary">
                Reset Password
            </SubmitButton>
        </FormContainer>
    );
};

export default ForgotPasswordForm;
