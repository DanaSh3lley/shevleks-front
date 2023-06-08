import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../actions/userActions";
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

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const error = useSelector((state) => state.user.error);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            phone,
            city,
            password,
            passwordConfirm,
        };
        dispatch(register(userData));
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            {error && (
                <ErrorText variant="body2" color="error" gutterBottom>
                    {error}
                </ErrorText>
            )}
            <Title>Реєстрація</Title>
            <Description>Створити новий аккаунт</Description>
            <InputField
                label="Ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Номер телефону"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <InputField
                label="Місто"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
            <InputField
                label="Повторіть пароль"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <SubmitButton type="submit" variant="contained" color="primary">
                Зареєструватися
            </SubmitButton>
        </FormContainer>
    );
};

export default RegistrationForm;
