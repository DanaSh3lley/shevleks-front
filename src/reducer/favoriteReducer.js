import {GET_FAVORITES_ERROR, GET_FAVORITES_REQUEST, GET_FAVORITES_SUCCESS} from "../actions/favoriteActions";

const initialState = {
    favorites: [],
    error: null,
    isLoading: false,
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_FAVORITES_SUCCESS:
            return {
                ...state,
                favorites: action.payload,
                isLoading: false,
                error: null,
            };
        case GET_FAVORITES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default favoritesReducer