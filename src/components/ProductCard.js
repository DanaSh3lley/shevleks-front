import {useEffect, useState} from "react";
import {styled} from "@mui/system";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteFilled} from "@carbon/icons-react";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites,} from "../actions/favoriteActions";
import UnauthorizedActionModal from "../pages/UnauthorizedActionModal";
import config from "../config";

const CardContainer = styled(Card)({
    maxWidth: "300px",
    padding: "24px",
    display: 'grid',
    gridAutoRows: '1fr',
    gridColumnGap: '5px',
    gridRowGap: '5px',
    maxHeight: '500px',
});

const ProductImage = styled("img")({
    height: "200px",
    maxHeight: "200px",
    margin: 'auto'
});

const ProductText = styled(Grid)({
    maxHeight: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '8px'
});

const ProductName = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "8px",
});

const ProductVolumePrice = styled(Typography)({
    marginBottom: "8px",
});

const ButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "auto",
});

const IconButtonContainer = styled("div")({
    display: "flex",
    gap: "8px",
});

const ProductButton = styled(Button)(({theme}) => ({
    background: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        background: theme.palette.primary.dark,
    },
}));

const AddToFavoritesButton = styled(Button)({
    color: "#FF7171",
    borderColor: "#FF7171",
});


function ProductCard({product}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const user = useSelector((state) => state.user.user);
    const [isFavorite, setIsFavorite] = useState(
        !!favorites.find((el) => el._id === product._id)
    );
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setIsFavorite(!!favorites.find((el) => el._id === product._id))
    }, [favorites, product]);

    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToFavorites = () => {
        if (user) {
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

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <CardContainer>
            <ProductImage
                crossorigin="anonymous"
                src={`${config[process.env.NODE_ENV].images}/products/${product.image}`}
                alt={product.name.uk}
            />
            <CardContent>
                <ProductText>
                    <ProductName variant="h6">{product.name.uk}</ProductName>
                </ProductText>
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
                    <AddToFavoritesButton
                        variant="outlined"
                        onClick={handleAddToFavorites}
                    >
                        {isFavorite ? <FavoriteFilled/> : <Favorite/>}
                    </AddToFavoritesButton>
                </IconButtonContainer>
            </ButtonContainer>
            <UnauthorizedActionModal open={showModal} onClose={handleModalClose}/>
        </CardContainer>
    );
}

export default ProductCard;
