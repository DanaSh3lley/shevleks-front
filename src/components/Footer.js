import React from "react";
import { Link } from "react-router-dom";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import { Phone } from "@carbon/icons-react";
import { ReactComponent as ReactLogo } from "../assets/logo.svg";

const FooterContainer = styled("footer")({
  background: "#272727",
  padding: "40px",
});

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: "flex",
  gap: "300px",
  color: "white",
}));

const Description = styled("div")({
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "27px",
  marginTop: "12px",
  maxWidth: "280px",
});

const LogoLink = styled(Link)({
  display: "block",
  width: "200px",
  maxWidth: "200px",
  "&  path": {
    fill: "white",
  },
});

const ContactPhone = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  // justifyContent: 'center'
});

function Footer() {
  return (
    <FooterContainer>
      <MainContainer maxWidth="xl">
        <Grid item alignContent="center" xs={12} sm={6}>
          <LogoLink to="/">
            <ReactLogo />
          </LogoLink>
          <Description>
            Продукція створена з любов’ю та думкою про Вас{" "}
          </Description>
          <Grid container gap={1} direction="column">
            <Typography variant="h6">
              Додаткова інформація за телефонами:
            </Typography>
            <ContactPhone variant="body1">
              <Phone size={24} />
              +38 0982177251
            </ContactPhone>
            <ContactPhone variant="body1">
              <Phone size={24} />
              +38 0982177251
            </ContactPhone>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle1">Column 1</Typography>
              <List component="nav">
                <ListItem to="/link1">
                  <ListItemText primary="Link 1" />
                </ListItem>
                <ListItem to="/link2">
                  <ListItemText primary="Link 2" />
                </ListItem>
                <ListItem to="/link3">
                  <ListItemText primary="Link 3" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1">Column 2</Typography>
              <List component="nav">
                <ListItem button component={Link} to="/link4">
                  <ListItemText primary="Link 4" />
                </ListItem>
                <ListItem button component={Link} to="/link5">
                  <ListItemText primary="Link 5" />
                </ListItem>
                <ListItem button component={Link} to="/link6">
                  <ListItemText primary="Link 6" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1">Column 3</Typography>
              <List component="nav">
                <ListItem button component={Link} to="/link7">
                  <ListItemText primary="Link 7" />
                </ListItem>
                <ListItem button component={Link} to="/link8">
                  <ListItemText primary="Link 8" />
                </ListItem>
                <ListItem button component={Link} to="/link9">
                  <ListItemText primary="Link 9" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
    </FooterContainer>
  );
}

export default Footer;
