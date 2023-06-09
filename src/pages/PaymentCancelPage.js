import React, {useEffect} from "react";
import { Box, Typography } from "@mui/material";
import { MisuseOutline } from "@carbon/icons-react";
import {useNavigate} from "react-router-dom";

function PaymentCancelPage({isAuthenticated}) {
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
      <MisuseOutline size={60} color="red" fontSize="large" />
      <Typography variant="h4" color="red" mt={2}>
        Payment Canceled
      </Typography>
      <Typography variant="body1" mt={2}>
        The payment process was canceled. If you have any questions, please
        contact our support team.
      </Typography>
      {/* Add any additional information or alternative options */}
    </Box>
  );
}

export default PaymentCancelPage;
