import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";

export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";

export const REMOVE_FROM_CART_REQUEST = "REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_ERROR = "REMOVE_FROM_CART_ERROR";
export const GET_CART_REQUEST = "GET_CART_REQUEST";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_ERROR = "GET_CART_ERROR";

export const UPDATE_CART_REQUEST = "UPDATE_CART_REQUEST";
export const UPDATE_CART_SUCCESS = "UPDATE_CART_SUCCESS";
export const UPDATE_CART_ERROR = "UPDATE_CART_ERROR";
export const CLEAR_CART_REQUEST = "CLEAR_CART_REQUEST";
export const CLEAR_CART_SUCCESS = "CLEAR_CART_SUCCESS";
export const CLEAR_CART_ERROR = "CLEAR_CART_ERROR";
export const CHECKOUT_REQUEST = "CHECKOUT_REQUEST";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_ERROR = "CHECKOUT_ERROR";

export const getCartRequest = () => ({
    type: GET_CART_REQUEST,
});

export const getCartSuccess = (data) => ({
    type: GET_CART_SUCCESS,
    payload: data,
});

export const getCartError = (error) => ({
    type: GET_CART_ERROR,
    payload: error,
});

export const updateCartRequest = () => ({
    type: UPDATE_CART_REQUEST,
});

export const updateCartSuccess = (data) => ({
    type: UPDATE_CART_SUCCESS,
    payload: data,
});

export const updateCartError = (error) => ({
    type: UPDATE_CART_ERROR,
    payload: error,
});

export const removeFromCartRequest = () => ({
    type: REMOVE_FROM_CART_REQUEST,
});

export const removeFromCartSuccess = (data) => ({
    type: REMOVE_FROM_CART_SUCCESS,
    payload: data,
});

export const removeFromCartError = (error) => ({
    type: REMOVE_FROM_CART_ERROR,
    payload: error,
});

export const clearCartRequest = () => ({
    type: CLEAR_CART_REQUEST,
});

export const clearCartSuccess = (data) => ({
    type: CLEAR_CART_SUCCESS,
    payload: data,
});

export const clearCartError = (error) => ({
    type: CLEAR_CART_ERROR,
    payload: error,
});

export const addToCartRequest = () => ({
    type: ADD_TO_CART_REQUEST,
});

export const addToCartSuccess = () => ({
    type: ADD_TO_CART_SUCCESS,
});

export const addToCartError = (error) => ({
    type: ADD_TO_CART_ERROR,
    payload: error,
});

export const getCart = () => (dispatch, getState) => {
    const token = Cookies.get("token");
    if (!getState().cart.isLoading && token) {
        dispatch(getCartRequest());
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .get(`${config[process.env.NODE_ENV].apiEndpoint}/cart`, {headers})
            .then((response) => {
                dispatch(getCartSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getCartError(error));
            });
    }
};

export const updateCart = (productId, data) => (dispatch, getState) => {
    const token = Cookies.get("token");

    if (!getState().cart.isLoading && token) {
        dispatch(updateCartRequest());

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .patch(`${config[process.env.NODE_ENV].apiEndpoint}/cart/${productId}`, data, {headers})
            .then((response) => {
                dispatch(updateCartSuccess(response.data));
            })
            .catch((error) => {
                dispatch(updateCartError(error));
            });
    }
};

export const removeFromCart = (productId, data) => (dispatch, getState) => {
    const token = Cookies.get("token");

    if (!getState().cart.isLoading && token) {
        dispatch(removeFromCartRequest());

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .delete(`${config[process.env.NODE_ENV].apiEndpoint}/cart/${productId}`, {headers, data})
            .then((response) => {
                dispatch(removeFromCartSuccess(response.data));
            })
            .catch((error) => {
                dispatch(removeFromCartError(error));
            });
    }
};

export const addToCart = (productId, params) => (dispatch, getState) => {
    const token = Cookies.get("token");
    const {product} = getState();
    const {isLoading} = product;
    if (token && !isLoading) {
        dispatch(addToCartRequest());
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios
            .post(`${config[process.env.NODE_ENV].apiEndpoint}/cart/${productId}`, params, {headers})
            .then(() => {
                dispatch(addToCartSuccess());
                dispatch(getCart());
            })
            .catch((error) => {
                dispatch(addToCartError(error));
            });
    }
};

export const clearCart = () => (dispatch, getState) => {
    const token = Cookies.get("token");

    if (!getState().cart.isLoading && token) {
        dispatch(clearCartRequest());

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .delete(`${config[process.env.NODE_ENV].apiEndpoint}/cart/clear`, {headers})
            .then((response) => {
                dispatch(clearCartSuccess(response.data.cart));
            })
            .catch((error) => {
                dispatch(clearCartError(error));
            });
    }
};

export const checkoutRequest = () => ({
    type: CHECKOUT_REQUEST,
});

export const checkoutSuccess = (data) => ({
    type: CHECKOUT_SUCCESS,
    payload: data,
});

export const checkoutError = (error) => ({
    type: CHECKOUT_ERROR,
    payload: error,
});

export const checkout = (data) => (dispatch, getState) => {
    const token = Cookies.get("token");

    if (!getState().cart.isLoading && token) {
        dispatch(checkoutRequest());

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios
            .post(`${config[process.env.NODE_ENV].apiEndpoint}/cart/checkout`, data, {headers})
            .then((response) => {
                dispatch(checkoutSuccess(response.data));
            })
            .catch((error) => {
                console.log(error)
                dispatch(checkoutError(error));
            });
    }
};
