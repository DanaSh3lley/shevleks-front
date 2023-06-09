import {
  GET_MESSAGES_ERROR,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../actions/messagesActions";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  selectedUser: null,
  isMessageSent: false,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload.data.messages,
        isLoading: false,
        error: null,
      };
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isMessageSent: true,
        error: null,
      };
    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
