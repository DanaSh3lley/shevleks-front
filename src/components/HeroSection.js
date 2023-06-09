import React from "react";
import { styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../assets/logo.svg";

const HeroSection = styled("section")({
  position: "relative",
  width: "932px",
  margin: "0 auto",
  padding: "124px 100px",
  borderRadius: "20px",
  background: `url('./img/heading.png') center/cover no-repeat`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ContentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  background: "rgba(247, 248, 250, 0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "2px",
  paddingTop: "48px",
  paddingBottom: "90px",
  paddingLeft: "80px",
  paddingRight: "80px",
});

const Title = styled(Typography)({
  marginBottom: "4px",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "40px",
  lineHeight: "58px",
  color: "#1D252C",
});

const Description = styled(Typography)({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "26px",
  textAlign: "center",
  maxWidth: "720px",
  color: "#1D252C",
  marginBottom: "8px",
});

const ButtonContainer = styled("span")({
  color: "white",
});

const LogoContainer = styled("div")({
  width: "120px",
});

function Hero() {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <ContentContainer>
        <LogoContainer>
          <ReactLogo />
        </LogoContainer>
        <Title variant="h1">Миючі засоби Дивомий</Title>
        <Description variant="body1">
          Уся продукція створена з любов’ю з найбільш якісної сировини та
          любов’ю до наших споживачів.
        </Description>
        <ButtonContainer>
          <Button
            style={{ width: "320px", color: "white", padding: "8px 12px" }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/catalog")}
          >
            Переглянути пропозиції
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </HeroSection>
  );
}

export default Hero;
