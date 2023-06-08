import {CLEAR_ERROR, SET_ERROR} from "../actions/errorActions";

const initialState = {
    errorMessage: null,
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                errorMessage: null,
            };
        default:
            return state;
    }
};

export default errorReducer;
