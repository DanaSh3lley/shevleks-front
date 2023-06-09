import React from "react";
import { styled } from "@mui/system";
import { Button, Modal, Typography } from "@mui/material";

const ModalContainer = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "32px",
    textAlign: "center",
    borderRadius: "8px",
});

const Title = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "16px",
});

const Content = styled(Typography)({
    marginBottom: "16px",
});

function UnauthorizedActionModal({ open, onClose }) {
  return <Modal open={open} onClose={onClose}>
        <ModalContainer>
            <Title variant="h5" gutterBottom>
                Oops! Unauthorized Access
            </Title>
            <Content variant="body1">
                Sorry, you need to login or create an account to perform this action.
            </Content>
            <Content>
                <Button variant='text' href="/login">Login</Button> | <Button variant='text' href="/signup">Sign Up</Button>
            </Content>
            <Button sx={{color: 'white'}} variant="contained" onClick={onClose}>
                Close
            </Button>
        </ModalContainer>
    </Modal>
}

export default UnauthorizedActionModal;
