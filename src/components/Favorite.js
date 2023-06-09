import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Container, Grid, Pagination, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { getFavorites } from "../actions/favoriteActions";
import LoadingComponent from "./Loading";

const FavoriteContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ProductGrid = styled(Grid)({
  marginBottom: "40px",
  justifyContent: "start",
  "& > .MuiGrid-item": {
    marginBottom: "20px",
  },
});

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const Description = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

function Favorite() {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state) => state.favorites.favorites || []
  );
  const totalFavoriteProducts = favoriteProducts.length;
  const isLoading = useSelector((state) => state.favorites.isLoading);
  const productsPerPage = 8;
  const totalPages = Math.ceil(totalFavoriteProducts / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getFavorites());
    }
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = favoriteProducts.slice(startIndex, endIndex);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <FavoriteContainer maxWidth="xl">
      <Title variant="h3" component="h1">
        Обрані продукти
      </Title>
      <Description variant="subtitle1">
        Ваші обрані продукти знаходяться тут
      </Description>
      <Grid container>
        <ProductGrid item spacing={2} container xs={12}>
          {displayedProducts?.length === 0 ? (
            <Typography variant="subtitle1">
              Your favorite list is empty.
            </Typography>
          ) : (
            displayedProducts?.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </ProductGrid>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Grid>
    </FavoriteContainer>
  );
}

export default Favorite;
