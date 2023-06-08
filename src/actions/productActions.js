import axios from "axios";
import Cookies from "js-cookie";
import {getCart} from "./cartActions";

export const GET_CATALOG_REQUEST = 'GET_CATALOG_REQUEST';
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS';
export const GET_CATALOG_ERROR = 'GET_CATALOG_ERROR';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'shev.com';
const endpoint = `${host}/api/products`;
const reviewsEndpoint = `${host}/api/reviews`;

export const getCatalogRequest = () => ({
    type: GET_CATALOG_REQUEST,
});

export const getCatalogSuccess = (data) => ({
    type: GET_CATALOG_SUCCESS,
    payload: data,
});

export const getCatalogError = (error) => ({
    type: GET_CATALOG_ERROR,
    payload: error,
});

export const getCatalog = (params) => {
    return (dispatch, getState) => {
        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                params[key] = value.join(',')
            }
            if (!params[key]) delete params[key]
        })
        if (!getState().product.isLoading) {
            dispatch(getCatalogRequest());
            axios
                .get(`${endpoint}/catalog`, {params})
                .then((response) => {
                    dispatch(getCatalogSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getCatalogError(error));
                });
        }
    };
};
export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_ERROR = 'GET_PRODUCT_ERROR';
export const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_ERROR = 'ADD_REVIEW_ERROR';

export const getProductRequest = () => ({
    type: GET_PRODUCT_REQUEST,
});

export const getProductSuccess = (data) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: data,
});

export const getProductError = (error) => ({
    type: GET_PRODUCT_ERROR,
    payload: error,
});

export const addReviewRequest = () => ({
    type: ADD_REVIEW_REQUEST,
});

export const addReviewSuccess = (data) => ({
    type: ADD_REVIEW_SUCCESS,
    payload: data,
});

export const addReviewError = (error) => ({
    type: ADD_REVIEW_ERROR,
    payload: error,
});

export const getProduct = (productId) => {
    return (dispatch, getState) => {
        if (!getState().product.isLoading) {
            dispatch(getProductRequest());
            axios
                .get(`${endpoint}/${productId}`)
                .then((response) => {
                    dispatch(getProductSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getProductError(error));
                });
        }
    };
};


export const addReview = (data) => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');
        const {product} = getState();
        const {isLoading} = product;
        if (!isLoading) {
            dispatch(addReviewRequest());
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios
                .post(`${reviewsEndpoint}`, data,{headers})
                .then((response) => {
                    dispatch(addReviewSuccess());
                    dispatch(getProduct(product.product.id))
                })
                .catch((error) => {
                    dispatch(addReviewError(error));
                });
        }
    };
};