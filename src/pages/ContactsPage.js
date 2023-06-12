import React from "react";
import { Grid, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import { LogoInstagram, Phone } from "@carbon/icons-react";
import contactImage from "../assets/contactImage.png";

const ContactContainer = styled(Container)(() => ({
    marginTop: "30px",
    marginBottom: "30px",
}));

const ContactContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: '80px'
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
        fontSize: "36px",
    },
}));

const ContactText = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    fontSize: "24px",
    marginBottom: "24px",
    textAlign: "justify",
    "& > span": {
        color: "#56B280",
    },
}));

const ContactImage = styled("img")(() => ({
    width: "40%",
    height: "auto",
    marginBottom: "20px",
}));

function ContactPage() {
    return (
        <ContactContainer maxWidth="xl">
            <ContactTitle variant="h4">Контакти</ContactTitle>
            <Grid sx={{display: 'flex', gap: '120px', marginTop: '40px'}}>
                <ContactContent>
                    <Grid sx={{flexDirection: 'row', display: 'flex', gap: '70px'}}>
                        <ContactText>
                            <Grid>
                                Звертайтесь за телефоном:<br/>
                                <Phone size={32} /> +38 0982177251<br/>
                                <Phone size={32} /> +38 0982177251
                            </Grid>
                        </ContactText>
                        <ContactText sx={{fontSize: '24px'}}>
                            Менеджер по роботі з клієнтами: <br />
                            <span>Дубінчук Олена Олександрівна</span>
                        </ContactText>
                    </Grid>
                    <ContactText>
                        Ми в соціальних мережах:<br />
                        <Grid sx={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <LogoInstagram size={32} />{" "}
                            <a
                                href="https://www.instagram.com/_shevleks.ua_"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color: 'black', textDecoration: 'none'}}
                            >
                                https://www.instagram.com/_shevleks.ua_
                            </a>
                        </Grid>

                    </ContactText>
                </ContactContent>
                <ContactImage src={contactImage} alt="Contact Image" />
            </Grid>

            <ContactText sx={{ marginTop: "20px", fontStyle: 'italic', textAlign: 'center' }}>
                Наш пріоритет - Ваша задоволеність, тому кожен клієнт для нас має особливе значення.
            </ContactText>
        </ContactContainer>
    );
}

export default ContactPage;
