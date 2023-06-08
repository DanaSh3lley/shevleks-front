import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/system';
import {
    Button,
    CardMedia,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {clearCart, getCart, removeFromCart, updateCart} from '../actions/cartActions';
import {Add, Subtract, TrashCan} from '@carbon/icons-react';
import LoadingComponent from "./Loading";
import {useNavigate} from "react-router-dom";

const baseUrl = 'http://localhost:3000';

const CartContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

const CartTableContainer = styled(TableContainer)(({theme}) => ({
    marginBottom: theme.spacing(2),
}));

const ProductImage = styled(CardMedia)(({theme}) => ({
    maxWidth: '150px',
    borderRadius: theme.shape.borderRadius,
}));

const ProductName = styled(Typography)(({theme}) => ({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const QuantityInput = styled(TextField)(({theme}) => ({
    width: '80px',
}));

const DeleteButton = styled(Button)(({theme}) => ({
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
    },
}));

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    useEffect(() => {
        if (!isLoading) {
            dispatch(getCart());
        }
    }, [dispatch]);

    const handleQuantityChange = (productId, quantity, volume) => {
        dispatch(updateCart(productId, {quantity: quantity, volume: volume}));
    };

    const handleRemoveItem = (productId, volume) => {
        dispatch(removeFromCart(productId, {volume}));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleGoToPayment = async () => {
        // await dispatch(checkout())
        navigate('/payment')
    };

    return (
        isLoading ? (<LoadingComponent/>) :
            <CartContainer maxWidth="xl">
                <Typography variant="h4" align="center" gutterBottom>
                    Cart
                </Typography>
                {cartItems?.length === 0 ? (
                    <Typography variant="subtitle1" align="center">
                        Your cart is empty.
                    </Typography>
                ) : (
                    <>
                        <CartTableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Назва продукту</TableCell>
                                        <TableCell>Об'єм</TableCell>
                                        <TableCell>Ціна</TableCell>
                                        <TableCell>Кількість</TableCell>
                                        <TableCell>Всього</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems?.map((item) => (
                                        <TableRow key={item.productId}>
                                            <TableCell>
                                                <Grid style={{display: 'flex'}}>
                                                    <ProductImage
                                                        component="img"
                                                        src={`${baseUrl}/img/products/${item.product.image}`}
                                                        alt={item.product.name.uk}
                                                    />
                                                    <Grid style={{marginLeft: '1rem', alignSelf: 'center'}}>
                                                        <ProductName variant="h5">{item.product.name?.uk}</ProductName>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant={'body1'}>
                                                    {item.volume}
                                                </Typography></TableCell>
                                            <TableCell>
                                                <Typography variant={'body1'}>
                                                    {item.product.price.find((p) => p.volume === item.volume).value} грн
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Grid sx={{display: 'flex', alignItems: 'center'}}>
                                                    <Button
                                                        color="primary"
                                                        variant={item.quantity <= 1 ? 'contained' : 'outlined'}
                                                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1, item.volume)} // Decrease the quantity by 1
                                                        disabled={item.quantity <= 1}
                                                        size="small"
                                                        sx={{
                                                            minWidth: '24px',
                                                            minHeight: '24px',
                                                            padding: 0,
                                                            marginRight: '8px',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <Subtract sx={{fontSize: '18px'}}/>
                                                    </Button>
                                                    <QuantityInput
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.productId, e.target.value, item.quantity)} // Pass the updated quantity value to the handler
                                                        inputProps={{min: 1}}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{width: '60px'}}
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1, item.volume)}
                                                        size="small"
                                                        sx={{
                                                            minWidth: '24px',
                                                            minHeight: '24px',
                                                            padding: 0,
                                                            marginLeft: '8px',
                                                            borderRadius: '50%',
                                                        }}
                                                    >
                                                        <Add sx={{fontSize: '18px'}}/>
                                                    </Button>
                                                </Grid>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant={'body1'}>
                                                    {item.product.price.find((p) => p.volume === item.volume).value * item.quantity} грн
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <DeleteButton
                                                    variant="text"
                                                    startIcon={<TrashCan/>}
                                                    onClick={() => handleRemoveItem(item.product._id, item.volume)}
                                                >
                                                    <Typography variant={'body1'}>
                                                        Delete
                                                    </Typography>
                                                </DeleteButton>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CartTableContainer>
                        <Grid container justifyContent="flex-end" alignItems="center" marginTop={2}>
                            <Grid item xs={6} sm={4} marginRight={36}>
                                <Typography variant="subtitle1" align="right">
                                    Всього: {totalPrice || (cartItems.reduce((prev, item) => prev + +item.product.price.find(el => el.volume === item.volume).value * item.quantity, 0))} грн
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={8} sx={{display: 'flex', gap: '12px'}}>
                                <Button variant="outlined" color="primary" onClick={handleClearCart}>
                                    Clear Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGoToPayment}
                                    disabled={cartItems?.length === 0}
                                    sx={{color: 'white'}}
                                >
                                    Go to Payment
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </CartContainer>
    );
};

export default Cart;
