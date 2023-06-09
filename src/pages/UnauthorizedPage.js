import React from "react";
import {Button, Container, Typography} from "@mui/material";

function UnauthorizedPage() {
    return (
        <Container maxWidth="md" style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
                Oops! Unauthorized Access
            </Typography>
            <Typography variant="body1">
                Sorry, you are not authorized to access this page. Please login or create an account
                to continue.
            </Typography>
            <Typography variant="body1">
                <Button variant="text" href="/login">Login</Button> | <Button variant='text' href="/signup">Sign Up</Button>
            </Typography>
        </Container>
    );
}

export default UnauthorizedPage;
