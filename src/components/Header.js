import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Badge, Button, IconButton } from "@mui/material";
import { Container, styled } from "@mui/system";
import { Chat, Favorite, ShoppingCart, User } from "@carbon/icons-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.svg";

const HeaderContainer = styled(AppBar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
  boxShadow: "none",
  borderBottom: "1px solid rgba(86,178,128, 0.2)",
});

const ToolbarContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

const NavLinksContainer = styled("div")({
  display: "flex",
  gap: "24px",
});

const NavLink = styled(Button)({
  fontFamily: "Roboto",
  fontSize: "16px",
  textDecoration: "none",
  textTransform: "none",
  fontWeight: "500",
});

const UserNavigation = styled("div")({
  display: "flex",
  gap: "12px",
});

const LogoLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
});

const LogoImage = styled("img")({
  width: "120px",
});

function Header({ isAuthenticated }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites);
  const cart = useSelector((state) => state.cart.items);
  return (
    <HeaderContainer position="static">
      <ToolbarContainer maxWidth="xl">
        <LogoLink to="/">
          <LogoImage src={logo} alt="Logo" />
        </LogoLink>
        <NavLinksContainer>
          <NavLink component={Link} to="/catalog" color="inherit">
            Каталог
          </NavLink>
          <NavLink component={Link} to="/about" color="inherit">
            Про нас
          </NavLink>
          <NavLink component={Link} to="/contacts" color="inherit">
            Контакти
          </NavLink>
        </NavLinksContainer>
        <UserNavigation>
          {isAuthenticated && user ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCart size={28} />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/favorites");
                }}
              >
                <Badge badgeContent={favorites.length} color="secondary">
                  <Favorite size={28} />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/messages");
                }}
              >
                <Chat size={28} />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <User size={28} />
              </IconButton>
            </>
          ) : (
            <>
              <NavLink component={Link} to="/login" color="inherit">
                Sign In
              </NavLink>
              <NavLink component={Link} to="/signup" color="inherit">
                Sign Up
              </NavLink>
            </>
          )}
        </UserNavigation>
      </ToolbarContainer>
    </HeaderContainer>
  );
}

export default Header;
