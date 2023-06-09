import React from "react";
import { CircularProgress, Box } from "@mui/material";

function LoadingComponent() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingComponent;
