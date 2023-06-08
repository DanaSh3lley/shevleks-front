import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword} from "../actions/userActions";
import { styled } from '@mui/system';
import {useNavigate} from "react-router-dom";

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

const UpdatePasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const error = useSelector((state) => state.user.error);
    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordData = {
             passwordCurrent,
            password,
            passwordConfirm,
        };
        dispatch(updateUserPassword(passwordData));
        if (!error)
            navigate('/')
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            {error && (
                <ErrorText variant="body2" color="error" gutterBottom>
                    Something went wrong
                </ErrorText>
            )}
            <Title>Update Password</Title>
            <InputField
                label="Current Password"
                value={passwordCurrent}
                onChange={(e) => setPasswordCurrent(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
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
                Update Password
            </SubmitButton>
        </FormContainer>
    );
};

export default UpdatePasswordForm;
