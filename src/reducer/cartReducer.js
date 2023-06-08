import {
    CHECKOUT_ERROR,
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CLEAR_CART_ERROR,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    GET_CART_ERROR,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    REMOVE_FROM_CART_ERROR,
    REMOVE_FROM_CART_REQUEST,
    REMOVE_FROM_CART_SUCCESS,
    UPDATE_CART_ERROR,
    UPDATE_CART_REQUEST,
    UPDATE_CART_SUCCESS,
} from '../actions/cartActions';


const initialState = {
    items: [],
    totalPrice: 0,
    isLoading: false,
    paymentLoading: false,
    error: null,
    paymentLink: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
        case UPDATE_CART_REQUEST:
        case REMOVE_FROM_CART_REQUEST:
        case CLEAR_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_CART_SUCCESS:
        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload.data.cartItems,
                totalPrice: action.payload.totalPrice,
            };
        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload.data.cart,
            };
        case CLEAR_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: [],
                totalPrice: 0,
            };
        case GET_CART_ERROR:
        case UPDATE_CART_ERROR:
        case REMOVE_FROM_CART_ERROR:
        case CLEAR_CART_ERROR:


        case CHECKOUT_REQUEST:
            return {
                ...state,
                paymentLoading: true,
                error: null,
            };
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                paymentLoading: false,
                paymentLink: action.payload.forwardLink
            };
        case CHECKOUT_ERROR:
            return {
                ...state,
                paymentLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
