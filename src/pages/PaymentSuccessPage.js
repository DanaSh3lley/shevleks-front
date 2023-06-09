import React, {useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { CheckmarkOutline } from "@carbon/icons-react";
import {useNavigate} from "react-router-dom";

function PaymentSuccessPage({isAuthenticated}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/unauthorized");
  }, [isAuthenticated]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CheckmarkOutline color="primary" fontSize={60} />
      <Typography variant="h4" color="primary" mt={2}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" mt={2}>
        Thank you for your payment. Your order has been processed successfully.
      </Typography>
    </Box>
  );
}

export default PaymentSuccessPage;
