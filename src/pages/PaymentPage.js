import { Container, styled } from "@mui/system";
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import PaymentCart from "../components/PaymentCart";
import LoadingComponent from "../components/Loading";

const PaymentContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: "flex",
  flexDirection: "row",
}));

function PaymentPage({isAuthenticated}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/unauthorized");
  }, [isAuthenticated]);

  const paymentLoading = useSelector((state) => state.cart.paymentLoading);
  return paymentLoading ? (
    <LoadingComponent />
  ) : (
    <PaymentContainer maxWidth="xl">
      <PaymentForm />
      <PaymentCart />
    </PaymentContainer>
  );
}

export default PaymentPage;
