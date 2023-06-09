import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, styled} from "@mui/system";
import {Button, FormControlLabel, Grid, Radio, RadioGroup, Rating, TextField, Typography,} from "@mui/material";
import {Add, Checkmark, Favorite, FavoriteFilled, ShoppingCart, Star, StarFilled, Subtract,} from "@carbon/icons-react";
import {addReview, getProduct} from "../actions/productActions";
import {addToFavorites, removeFromFavorites,} from "../actions/favoriteActions";

import RatingComponent from "./RatingComponent";
import LoadingComponent from "./Loading";
import {addToCart} from "../actions/cartActions";
import UnauthorizedActionModal from "../pages/UnauthorizedActionModal";
import config from "../config";

const ProductContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: "60px",
}));

const MainContent = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '100px',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#56B280",
    },
    "& .MuiRating-iconHover": {
        color: "rgba(86,178,128,0.5)",
    },
});

const ProductImage = styled("img")(({theme}) => ({
    maxWidth: "500px",
    maxHeight: "500px",
    minWidht: '500px',
    background: "lightblue",
    marginBottom: theme.spacing(2),
}));

function Product({productId}) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);
    const user = useSelector((state) => state.user.user);
    const isLoading = useSelector((state) => state.product.isLoading);
    const favorites = useSelector((state) => state.favorites.favorites);
    const error = useSelector((state) => state.product.error);
    const [selectedVolume, setSelectedVolume] = useState(product?.price[0]?.volume);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getProduct(productId));
        if (!selectedVolume) {
            setSelectedVolume(product?.price[0]?.volume)
        }
    }, [dispatch, productId]);

    useEffect(() => {
        setIsFavorite(!!favorites.find((el) => el._id === product._id))
    }, [favorites, product]);

    const handleVolumeChange = (event) => {
        setSelectedVolume(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        if (user) {

            dispatch(addToCart(product._id, {volume: selectedVolume, quantity}));
            if (!error) {
                setIsInCart(true);
            }
        } else {
            setShowModal(true);
        }
    }


    const handleAddToFavorites = () => {
        if (user) {
            setIsFavorite(!!favorites.find((el) => el._id === product._id))
            if (!isFavorite) {
                dispatch(addToFavorites(product._id));
                setIsFavorite(true);
            } else {
                dispatch(removeFromFavorites(product._id));
                setIsFavorite(false);
            }
        } else {
            setShowModal(true);
        }
    };

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleAddReview = async () => {
        const reviewData = {
            review: comment,
            rating,
            product: product._id,
        };
        await dispatch(addReview(reviewData));
        setRating(0);
        setComment("");
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return isLoading || !product ? (
        <LoadingComponent/>
    ) : (
        <ProductContainer maxWidth="xl" spacing={4}>
            <MainContent item container xs={12}>
                <Grid item xs={12} sm={6} md={4}>
                    <ProductImage
                        src={`${config[process.env.NODE_ENV].images}/products/${product.image}`}
                        alt={product.name.uk}
                    />
                    <Typography variant="body2" display="flex" alignItems="center">
                        Рейтинг:
                        <StyledRating
                            value={product.rating}
                            precision={1}
                            readOnly
                            icon={<StarFilled size={24}/>}
                            emptyIcon={<Star size={24}/>}
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Typography marginBottom="8px" variant="h4">{product.name.uk}</Typography>
                    <Typography sx={{marginBottom: "8px"}} variant="body1">
                        {product.description.uk}
                    </Typography>
                    <Typography variant="body1">
                        <b>Застосування:</b> {product.usage?.uk}
                    </Typography>
                    <Typography color="primary" variant="h6">
                        Price:{" "}
                        {(product.price.find((p) => p.volume === selectedVolume)?.value ||
                            product.price[0].value) * quantity}{" "}
                        грн
                    </Typography>
                    <RadioGroup
                        name="volume"
                        value={selectedVolume || product.price[0].volume}
                        onChange={handleVolumeChange}
                        row
                    >
                        {product.price.map((price) => (
                            <FormControlLabel
                                key={price.volume}
                                value={price.volume}
                                control={<Radio/>}
                                label={price.volume}
                            />
                        ))}
                    </RadioGroup>
                    <Grid
                        sx={{marginBottom: "20px"}}
                        container
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Button
                                color="primary"
                                variant={quantity <= 1 ? "contained" : "contained"}
                                onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Subtract size={24}/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                inputProps={{min: 1}}
                                size="small"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setQuantity((prevQuantity) => +prevQuantity + 1)}
                            >
                                <Add size={24}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        sx={{color: `${isInCart && 'white'}`}}
                        variant={isInCart ? "contained" : "outlined"}
                        color="primary"
                        onClick={handleAddToCart}
                        startIcon={!isInCart ? <ShoppingCart/> : <Checkmark/>}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddToFavorites}
                        startIcon={isFavorite ? <FavoriteFilled/> : <Favorite/>}
                        style={{marginLeft: "8px"}}
                    >
                        Add to Favorites
                    </Button>
                </Grid>
            </MainContent>
            <Grid item xs={12}>
                <Typography variant="h5">Add a Review</Typography>
                <RatingComponent value={rating} onChange={handleRatingChange}/>
                <TextField
                    value={comment}
                    onChange={handleCommentChange}
                    label="Comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                />
                <Button sx={{color: 'white'}} variant="contained" color="primary" onClick={handleAddReview}>
                    Submit Review
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" style={{marginBottom: "16px"}}>
                    Product Reviews
                </Typography>
                {product.reviews.length === 0 ? (
                    <Typography>No reviews available</Typography>
                ) : (
                    product.reviews.map((review) => (
                        <div key={review.id} style={{marginBottom: "16px"}}>
                            <Typography variant="subtitle1" style={{fontWeight: "bold"}}>
                                {review.user.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                Рейтинг:
                                <StyledRating
                                    value={review.rating}
                                    precision={1}
                                    readOnly
                                    icon={<StarFilled size={16}/>}
                                    emptyIcon={<Star size={16}/>}
                                    style={{marginLeft: "8px"}}
                                />
                            </Typography>
                            <Typography variant="body1">{review.review}</Typography>
                        </div>
                    ))
                )}
            </Grid>
            <UnauthorizedActionModal open={showModal} onClose={handleModalClose}/>
        </ProductContainer>
    );
}

export default Product;
