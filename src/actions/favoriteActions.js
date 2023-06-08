import axios from "axios";
import Cookies from "js-cookie";

export const GET_FAVORITES_REQUEST = 'GET_FAVORITES_REQUEST';
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
export const GET_FAVORITES_ERROR = 'GET_FAVORITES_ERROR';
export const ADD_TO_FAVORITES_REQUEST = 'ADD_TO_FAVORITES_REQUEST';
export const ADD_TO_FAVORITES_SUCCESS = 'ADD_TO_FAVORITES_SUCCESS';
export const ADD_TO_FAVORITES_ERROR = 'ADD_TO_FAVORITES_ERROR';
export const REMOVE_FROM_FAVORITES_REQUEST = 'REMOVE_FROM_FAVORITES_REQUEST';
export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';
export const REMOVE_FROM_FAVORITES_ERROR = 'REMOVE_FROM_FAVORITES_ERROR';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'shev.com';
const favoritesEndpoint = `${host}/api/favorites`;
export const addToFavoritesRequest = () => ({
    type: ADD_TO_FAVORITES_REQUEST,
});

export const addToFavoritesSuccess = () => ({
    type: ADD_TO_FAVORITES_SUCCESS,
});

export const addToFavoritesError = (error) => ({
    type: ADD_TO_FAVORITES_ERROR,
    payload: error,
});

export const removeFromFavoritesRequest = () => ({
    type: REMOVE_FROM_FAVORITES_REQUEST,
});

export const removeFromFavoritesSuccess = () => ({
    type: REMOVE_FROM_FAVORITES_SUCCESS,
});

export const removeFromFavoritesError = (error) => ({
    type: REMOVE_FROM_FAVORITES_ERROR,
    payload: error,
});
export const getFavoritesRequest = () => ({
    type: GET_FAVORITES_REQUEST,
});

export const getFavoritesSuccess = (data) => ({
    type: GET_FAVORITES_SUCCESS,
    payload: data,
});

export const getFavoritesError = (error) => ({
    type: GET_FAVORITES_ERROR,
    payload: error,
});


export const getFavorites = () => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');

        if (!getState().favorites.isLoading && token) {
            dispatch(getFavoritesRequest());

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get(`${favoritesEndpoint}/`, {headers})
                .then((response) => {
                    dispatch(getFavoritesSuccess(response.data.favorites));
                })
                .catch((error) => {
                    dispatch(getFavoritesError(error));
                });
        }
    };
};

export const addToFavorites = (productId) => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');
        const {product} = getState();
        const {isLoading} = product;
        if (token && !isLoading) {
            dispatch(addToFavoritesRequest());
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios
                .post(`${favoritesEndpoint}/${productId}`, null, {headers})
                .then((response) => {
                    dispatch(addToFavoritesSuccess());
                    dispatch(getFavorites())

                })
                .catch((error) => {
                    dispatch(addToFavoritesError(error));
                });
        }
    };
};

export const removeFromFavorites = (productId) => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');
        const {product} = getState();
        const {isLoading} = product;
        if (token && !isLoading) {
            dispatch(removeFromFavoritesRequest());
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios
                .delete(`${favoritesEndpoint}/${productId}`, {headers})
                .then((response) => {
                    dispatch(removeFromFavoritesSuccess());
                    dispatch(getFavorites())
                })
                .catch((error) => {
                    dispatch(removeFromFavoritesError(error));
                });
        }
    };
};