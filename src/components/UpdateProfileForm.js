import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from "../actions/userActions";
import { styled } from '@mui/system';

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

const UpdateUserForm = () => {
    const dispatch = useDispatch();
    const { user, error, updateSuccess } = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setCity(user.city || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            phone,
            city,
        };
        dispatch(updateUserInfo(userData));
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Update Profile</Title>
            <InputField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            {error && (
                <ErrorText variant="body2" color="error" gutterBottom>
                    Something went wrong
                </ErrorText>
            )}
            {!error && updateSuccess &&(
                <SuccessText variant="body2" color="success" gutterBottom>
                    Data updated successfully
                </SuccessText>
            )}
            <SubmitButton type="submit" variant="contained" color="primary">
                Update
            </SubmitButton>
        </FormContainer>
    );
};

export default UpdateUserForm;
