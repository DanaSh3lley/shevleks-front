import React, {useEffect, useState} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkout} from "../actions/cartActions";

const FormContainer = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    maxWidth: "600px",
    margin: "0 auto",
});

const InputField = styled(TextField)({
    marginBottom: "16px",
    width: "100%",
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

function PaymentForm() {
    const dispatch = useDispatch();
    const paymentLink = useSelector((state) => state.cart.paymentLink);
    useSelector((state) => state.cart.isLoading);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [post, setPost] = useState("");

    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    useEffect(
        () => () => {
            if (paymentLink) {
                window.location.href = paymentLink;
            }
        },
        [dispatch, paymentLink]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !surname || !phone || !city || !state || !address) {
            setFormError("Please fill in all fields");
            return;
        }

        setFormError("");
        const shippingAddress = `${state}, ${city}, ${address}, ${post}`
        dispatch(
            checkout({shippingAddress})
        );
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Оформлення замовлення</Title>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <InputField
                        label="Ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        label="Прізвище"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <InputField
                        label="Місто"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        label="Область"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <InputField
                label="Номер телефону"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <InputField
                label="Адреса доставки"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <InputField
                label="Пошта"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                fullWidth
                variant="outlined"
            />
            {formError && <Typography color="error">{formError}</Typography>}
            <SubmitButton type="submit" variant="contained" color="primary">
                Перейти до оплати
            </SubmitButton>
            <Button
                type="button"
                variant="text"
                color="primary"
                onClick={() => navigate("/cart")}
            >
                Назад
            </Button>
        </FormContainer>
    );
}

export default PaymentForm;
