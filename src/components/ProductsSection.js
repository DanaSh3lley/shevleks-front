import React, { useEffect } from "react";
import { Container, styled } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getCatalog } from "../actions/productActions";
import LoadingComponent from "./Loading";

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
}));

const ProductsContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

function ProductsSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.catalog);
  const isLoading = useSelector((state) => state.product.isLoading);
  const handleNavigationToCatalog = () => {
    navigate("/catalog");
  };

  useEffect(() => {
    if (!isLoading && !products.length) {
      dispatch(getCatalog({ page: 1, limit: 4 }));
    }
  }, [dispatch, isLoading, products.length]);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <MainContainer maxWidth="xl">
      <ProductsContainer container spacing={2}>
        {products.slice(0, 4).map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </ProductsContainer>
      <Button onClick={handleNavigationToCatalog}>Перейти до каталогу</Button>
    </MainContainer>
  );
}
export default ProductsSection;
