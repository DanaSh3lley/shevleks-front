import React, {useState} from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from "../actions/userActions";
import {styled} from '@mui/system';
import {useParams} from "react-router-dom";

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

const SuccessText = styled(Typography)({
    color: 'green',
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

const ResetPasswordForm = ({token}) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const error = useSelector((state) => state.user.error);
    const successMessage = useSelector((state) => state.user.successMessage);
    const {resetToken} = useParams()
    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordData = {
            password,
            passwordConfirm
        };
        dispatch(resetPassword(resetToken, passwordData));
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            {error && (
                <ErrorText variant="body2" color="error" gutterBottom>
                    {error}
                </ErrorText>
            )}
            {successMessage && (
                <SuccessText variant="body2" color="success" gutterBottom>
                    {successMessage}
                </SuccessText>
            )}
            <Title>Reset Password</Title>
            <InputField
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Confirm New Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <SubmitButton type="submit" variant="contained" color="primary">
                Reset Password
            </SubmitButton>
        </FormContainer>
    );
};

export default ResetPasswordForm;
