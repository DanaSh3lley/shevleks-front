import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { CardMedia, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import LoadingComponent from "./Loading";
import { getCart } from "../actions/cartActions";
import config from "../config";


const CartProductContainer = styled(CardMedia)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f5fff7",
  flexDirection: "row", // Change to row
  flexWrap: "wrap", // Allow wrapping to multiple rows
  padding: "60px",
  width: "50%",
}));

const ProductItem = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`, // Add a line between products
  paddingBottom: theme.spacing(3), // Increase the padding at the bottom
  marginBottom: theme.spacing(3), // Increase the margin at the bottom
  width: "100%", // Adjust the width to fill the container
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  maxWidth: "150px",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(3), // Add some spacing to the right of the image
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem", // Increase the font size
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const ProductInfo = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem", // Increase the font size
  color: theme.palette.primary.main, // Set the color to primary
}));

function PaymentCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isLoading = useSelector((state) => state.cart.isLoading);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getCart());
    }
  }, [dispatch]);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <CartProductContainer>
      {cartItems.length === 0 ? (
        <Typography variant="subtitle1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <ProductItem item xs={12} sm={6} md={4} key={item._id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <ProductImage
                    component="img"
                    src={`${config[process.env.NODE_ENV].images}/products/${item.product.image}`}
                    alt={item.product.name.uk}
                  />
                </Grid>
                <Grid item xs>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <ProductName variant="h5">
                        {item.product.name?.uk}, ({item.volume}) ({item.quantity} шт)
                      </ProductName>
                    </Grid>
                    <Grid item>
                      <ProductInfo>
                        {
                          item.product.price.find(
                            (p) => p.volume === item.volume
                          ).value * item.quantity
                        }
                        грн
                      </ProductInfo>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ProductItem>
          ))}
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            marginTop={2}
          >
            <Grid item>
              <Typography color="primary" variant="h5" align="right">
                Всього:{" "}
                {cartItems.reduce(
                  (prev, item) =>
                    prev +
                    +item.product.price.find((el) => el.volume === item.volume)
                      .value *
                      item.quantity,
                  0
                )}{" "}
                грн
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </CartProductContainer>
  );
}

export default PaymentCart;
