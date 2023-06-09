import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {styled} from "@mui/system";
import {getOrders, logout} from "../actions/userActions";
import LoadingComponent from "./Loading";

const UserInfoContainer = styled("div")({
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#F5F5F5",
    padding: "16px",
});

const UserInformation = styled("div")({
    marginBottom: "16px",
});

const UpdateLink = styled(Link)({
    display: "block",
    marginBottom: "16px",
    textDecoration: "none",
    color: "#FFFFFF",
    fontWeight: "bold",
});

const OrdersContainer = styled("div")({
    marginLeft: "32px",
    width: "100%",
});

const CustomButton = styled(Button)({
    marginBottom: "16px",
    color: "white",
});

function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, orders, loading, loadingOrders} = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return loading || loadingOrders ? (
        <LoadingComponent/>
    ) : (
        <div style={{display: "flex"}}>
            <UserInfoContainer>
                <Typography variant="h4">User Information:</Typography>
                <UserInformation>
                    <Typography variant="subtitle1">Name:</Typography>
                    <Typography>{user?.name}</Typography>
                </UserInformation>
                <UserInformation>
                    <Typography variant="subtitle1">Email:</Typography>
                    <Typography>{user?.email}</Typography>
                </UserInformation>
                <UserInformation>
                    <Typography variant="subtitle1">Phone:</Typography>
                    <Typography>{user?.phone}</Typography>
                </UserInformation>
                <UserInformation>
                    <Typography variant="subtitle1">City:</Typography>
                    <Typography>{user?.city}</Typography>
                </UserInformation>
                <UpdateLink to="/update">
                    <CustomButton variant="contained" color="primary">
                        Update Profile
                    </CustomButton>
                </UpdateLink>
                <CustomButton onClick={() => handleLogout()} variant="contained" color="error">
                    Logout
                </CustomButton>
            </UserInfoContainer>

            <OrdersContainer>
                <Typography variant="h4">Orders:</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Shipping Address</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>
                                        {order.product.map((product) => (
                                            <div key={product._id}>
                                                {product.product?.name.uk || 'deleted item'} - {product.volume},{" "}
                                                {product.quantity}
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>{order.shippingAddress}</TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </OrdersContainer>
        </div>
    );
}

export default User;
