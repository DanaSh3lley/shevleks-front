// Define your login action types
import axios from "axios";
import Cookies from "js-cookie"
import {getCart} from "./cartActions";
import {getFavorites} from "./favoriteActions";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST'
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
export const UPDATE_USER_PASSWORD_REQUEST = 'UPDATE_USER_PASSWORD_REQUEST';
export const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS';
export const UPDATE_USER_PASSWORD_FAILURE = 'UPDATE_USER_PASSWORD_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'shev.com';
const endpoint = `${host}/api/users`;
const ordersEndpoint = `${host}/api/orders`;

// Define your login action creators
export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = (user) => ({
    type: LOGOUT_SUCCESS,
    payload: user,
});

export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error,
});

// Define an asynchronous login action
export const login = (credentials) => {
    return (dispatch) => {
        dispatch(loginRequest());

        axios
            .post(`${endpoint}/login`, credentials)
            .then((response) => {
                const {token, user} = response.data;
                Cookies.set('token', token);
                dispatch(loginSuccess(user));
                dispatch(getUserInfo())
            })
            .catch((error) => {
                // Handle the login error
                dispatch(loginFailure(error.response.data.message));
            });
    };
};

export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

export const register = (userData) => {
    return (dispatch) => {
        dispatch(registerRequest());

        axios
            .post(`${endpoint}/signup`, userData)
            .then((response) => {
                const {token, user} = response.data;
                Cookies.set('token', token);
                dispatch(registerSuccess(user));
                dispatch(getUserInfo())
            })
            .catch((error) => {
                dispatch(registerFailure(error.response.data.error));
            });
    };
};

export const getUserInfoRequest = () => ({
    type: GET_USER_INFO_REQUEST,
});

export const getUserInfoSuccess = (user) => ({
    type: GET_USER_INFO_SUCCESS,
    payload: user,
});

export const getUserInfoFailure = (error) => ({
    type: GET_USER_INFO_FAILURE,
    payload: error,
});

export const updateUserPasswordRequest = () => ({
    type: UPDATE_USER_PASSWORD_REQUEST,
});

export const updateUserPasswordSuccess = (user) => ({
    type: UPDATE_USER_PASSWORD_SUCCESS,
    payload: user,
});

export const updateUserPasswordFailure = (error) => ({
    type: UPDATE_USER_PASSWORD_FAILURE,
    payload: error,
});

export const updateUserInfoRequest = () => ({
    type: UPDATE_USER_INFO_REQUEST,
});

export const updateUserInfoSuccess = (user) => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload: user,
});

export const updateUserInfoFailure = (error) => ({
    type: UPDATE_USER_INFO_FAILURE,
    payload: error,
});

export const getUserInfo = () => {
    return async (dispatch, getState) => {
        const token = Cookies.get('token');
        const {user} = getState();
        const {loading} = user;
        if (token && !loading) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(getUserInfoRequest());
            try {
                const response = await axios.get(`${endpoint}/me`, {headers});
                dispatch(getUserInfoSuccess(response.data.data.data));
                dispatch(getCart())
                dispatch(getFavorites())
            } catch (error) {
                dispatch(getUserInfoFailure());
            }
        }
    };
};

export const updateUserInfo = (data) => {
    return async (dispatch, getState) => {
        const token = Cookies.get('token');
        const {user} = getState();
        const {loading} = user;
        if (token && !loading) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(updateUserInfoRequest());
            try {
                const response = await axios.patch(`${endpoint}/updateMe`, data,{headers});
                dispatch(updateUserInfoSuccess(response.data.data.data));
                dispatch(getUserInfo())
            } catch (error) {
                dispatch(updateUserInfoFailure());
            }
        }
    };
};

export const updateUserPassword = (data) => {
    return async (dispatch, getState) => {
        const token = Cookies.get('token');
        const {user} = getState();
        const {loading} = user;
        if (token && !loading) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(updateUserPasswordRequest());
            try {
                const response = await axios.patch(`${endpoint}/updateMyPassword`, data,{headers});
                console.log(response)
                dispatch(updateUserPasswordSuccess(response.data.data.data));
                dispatch(logout())
            } catch (error) {
                console.log(error)

                dispatch(updateUserPasswordFailure());
            }
        }
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        const token = Cookies.get('token');
        const {user} = getState();
        const {loading} = user;
        if (token && !loading) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(logoutRequest());
            try {
                const response = await axios.get(`${endpoint}/updateMyPassword`,{headers});
                console.log(response)
                dispatch(logoutSuccess(response.data.data.data));
                Cookies.remove('token')
            } catch (error) {
                console.log(error)
                dispatch(logoutFailure());
            }
        }
    };
};




export const forgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = (user) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: user,
});

export const forgotPasswordFailure = (error) => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error,
});

export const forgotPassword = (data) => {
    return async (dispatch, getState) => {
        dispatch(forgotPasswordRequest());
        try {
            const response = await axios.post(`${endpoint}/forgotPassword`, data,);
            dispatch(forgotPasswordSuccess(response.data));
        } catch (error) {
            dispatch(forgotPasswordFailure());
        }
    }
};

export const resetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = (user) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: user,
});

export const resetPasswordFailure = (error) => ({
    type: RESET_PASSWORD_FAILURE,
    payload: error,
});

export const resetPassword = (resetToken, data) => {
    return async (dispatch) => {
        dispatch(resetPasswordRequest());
        try {
            const response = await axios.patch(`${endpoint}/resetPassword/${resetToken}`, data);
            dispatch(resetPasswordSuccess(response.data));
        } catch (error) {
            dispatch(resetPasswordFailure());
        }
    }
};

export const getOrdersRequest = () => ({
    type: GET_ORDERS_REQUEST,
});

export const getOrdersSuccess = (orders) => ({
    type: GET_ORDERS_SUCCESS,
    payload: orders,
});
export const getOrdersFailure = (error) => ({
    type: GET_ORDERS_FAILURE,
    payload: error,
});

export const getOrders = () => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');
        if (!getState().user.loadingOrders && token) {
            dispatch(getOrdersRequest());
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get(`${ordersEndpoint}/user`, { headers })
                .then((response) => {
                    dispatch(getOrdersSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getOrdersFailure(error));
                });
        }
    };
};