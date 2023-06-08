import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {useNavigate} from 'react-router-dom';
import {checkout} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    maxWidth: '600px',
    margin: '0 auto',
});

const InputField = styled(TextField)({
    marginBottom: '16px',
    width: '100%',
});

const SubmitButton = styled(Button)({
    marginTop: '16px',
    color: 'white',
});

const Title = styled(Typography)({
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
});

const PaymentForm = () => {
    const dispatch = useDispatch()
    const paymentLink = useSelector(state => state.cart.paymentLink)
    const isLoading = useSelector((state) => state.cart.isLoading);
    const [name, setName] = useState('Blab ');
    const [surname, setSurname] = useState('bka');
    const [phone, setPhone] = useState('fcgvhbj');
    const [city, setCity] = useState('rctfgvbh');
    const [state, setState] = useState('cfgvbhjk');
    const [address, setAddress] = useState('cfgvhbjnbgvycft');
    const [post, setPost] = useState('fgvhbjnbhkgvybhnj');

    const [formError, setFormError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (paymentLink) {
                console.log(paymentLink)
                window.location.href = paymentLink
            }

        };
    }, [dispatch, paymentLink]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !surname || !phone || !city || !state || !address) {
            setFormError('Please fill in all fields');
            return;
        }

        setFormError('');
        dispatch(checkout({name, surname, city, phone, state, address, shippingAddress: post}));
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Payment Information</Title>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <InputField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        label="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}> {/* Use Grid container to place fields in one row */}
                <Grid item xs={6}>
                    <InputField
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <InputField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <InputField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <InputField
                label="Post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                fullWidth
                variant="outlined"
            />
            {formError && <Typography color="error">{formError}</Typography>}
            <SubmitButton type="submit" variant="contained" color="primary">
                Proceed to Payment
            </SubmitButton>
            <Button type="button" variant="text" color="primary" onClick={() => navigate('/cart')}>
                Cancel
            </Button>
        </FormContainer>
    );
};

export default PaymentForm;
