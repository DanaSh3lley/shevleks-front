import React from "react";
import { Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import aboutUsImage from "../assets/aboutUsImage.png";

const AboutContainer = styled(Container)(() => ({
    marginTop: "30px",
    marginBottom: "30px",
}));

const AboutContent = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "100px",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "50px",
    },
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
        fontSize: "36px",
    },
}));

const AboutText = styled(Typography)(({ theme }) => ({
    fontSize: "28px",
    marginBottom: "24px",
    textAlign: "justify",

    '& > span': {
        color: '#56B280'
    },

    [theme.breakpoints.down("md")]: {
        fontSize: "24px",
    },
}));

const AboutImage = styled("img")(({ theme }) => ({
    width: "500px",
    height: "auto",
    marginRight: "40px",
    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginRight: 0,
    },
}));

function AboutUs() {
    return (
        <AboutContainer maxWidth="xl">
            <AboutTitle variant="h4">Про нас</AboutTitle>
            <AboutContent>
                <AboutText>
                    Компанія Шевлекс, заснована <span>Вітюком Олексієм Євгеновичем</span> та{" "}
                    <span>Шевчуком Петром Степановичем</span> у 2010 році, успішно працює на ринку вже понад{" "}
                    <span>12</span> років.
                    <br />
                    <br />
                    Штаб-квартира компанії розташована у місті Рівне, Україна.
                    <br />
                    <br />
                    Компанія пропонує широкий асортимент продукції для прибирання різних поверхонь та предметів. Вам доступні
                    засоби для прибирання будинків, квартир, офісів, автомобілів та інших об&apos;єктів.
                </AboutText>
                <AboutImage src={aboutUsImage} alt="About Us Image" />
            </AboutContent>
            <AboutText sx={{marginTop: '20px'}}>
                Шевлекс використовує інноваційні і екологічно чисті інгредієнти, щоб забезпечити ефективність мийних засобів при
                мінімальному впливі на довкілля.
            </AboutText>
        </AboutContainer>
    );
}

export default AboutUs;
