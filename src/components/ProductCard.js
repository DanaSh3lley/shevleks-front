import React, {useState} from 'react';
import {styled} from '@mui/system';
import {Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteFilled} from "@carbon/icons-react";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites} from "../actions/favoriteActions";

const baseUrl = 'http://localhost:3000';

const CardContainer = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '300px',
    padding: '24px'
});

const ProductImage = styled('img')({
    height: '200px',
    width: '100%',
    objectFit: 'cover',
    maxHeight: '200px',
});

const ProductName = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: '8px',
});

const ProductDescription = styled(Typography)({
    marginBottom: '8px',
});

const ProductVolumePrice = styled(Typography)({
    marginBottom: '8px',
});

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
});

const IconButtonContainer = styled('div')({
    display: 'flex',
    gap: '8px',
});

const ProductButton = styled(Button)(({theme}) => ({
    background: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
        background: theme.palette.primary.dark,
    },
}));

const AddToFavoritesButton = styled(Button)({
    color: '#FF7171',
    borderColor: '#FF7171',
});

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favorites)
    const [isFavorite, setIsFavorite] = useState(!!favorites.find(el => el._id === product._id));
    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToFavorites = () => {
        if (!isFavorite) {
            dispatch(addToFavorites(product._id))
            setIsFavorite(true);
        }
        else {
            dispatch(removeFromFavorites(product._id))
            setIsFavorite(false);
        }
    };

    return (
        <CardContainer>
            <ProductImage src={`${baseUrl}/img/products/${product.image}`} alt={product.name.uk}/>
            <CardContent>
                <ProductName variant="h6">{product.name.uk}</ProductName>
                <ProductDescription>{product.description.uk}</ProductDescription>
                {product.price.map((item) => (
                    <ProductVolumePrice key={item.volume}>
                        {item.volume} - {item.value} грн
                    </ProductVolumePrice>
                ))}
            </CardContent>
            <ButtonContainer>
                <ProductButton variant="contained" onClick={handleProductClick}>
                    Перейти
                </ProductButton>
                <IconButtonContainer>
                    <AddToFavoritesButton variant="outlined" onClick={handleAddToFavorites}>
                        {isFavorite ? <FavoriteFilled /> : <Favorite />}
                    </AddToFavoritesButton>
                </IconButtonContainer>
            </ButtonContainer>
        </CardContainer>
    );
};

export default ProductCard;
