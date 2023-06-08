import PaymentForm from "../components/PaymentForm";
import PaymentCart from "../components/PaymentCart";
import {Container, styled} from "@mui/system";
import LoadingComponent from "../components/Loading";
import React from "react";
import {useSelector} from "react-redux";

const PaymentContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row'
}));


const PaymentPage = () => {
    const paymentLoading   = useSelector((state) => state.cart.paymentLoading);
    const isLoading   = useSelector((state) => state.cart.isLoading);
    console.log(paymentLoading, isLoading);
    return !!(paymentLoading) ? (<LoadingComponent/>) :
    <PaymentContainer maxWidth={'xl'} >
        <PaymentForm/>
        <PaymentCart/>
    </PaymentContainer>
}

export default PaymentPage