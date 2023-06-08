import {
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS,
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_USER_INFO_FAILURE,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS
} from "../actions/userActions";

const initialState = {
    user: null,
    orders: [],
    loadingOrders: false,
    loading: false,
    error: null,
    forgotSuccess: null,
    updateSuccess: null,
    passwordUpdateSuccess: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_INFO_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
                forgotSuccess: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                forgotSuccess: null
            };
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                forgotSuccess: null,
                updateSuccess: true
            };
        case UPDATE_USER_INFO_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                forgotSuccess: null
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                forgotSuccess: true
            };
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                forgotSuccess: false
            };
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loadingOrders: true,
                error: null,
            };
        case GET_ORDERS_SUCCESS:
            console.log(state.user)
            return {
                ...state,
                orders: action.payload.orders,
                loadingOrders: false,
                error: null,
            };
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loadingOrders: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
