import axios from "axios";
import Cookies from "js-cookie";
import {GET_CATALOG_REQUEST} from "./productActions";

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'shev.com';
const messagesEndpoint = `${host}/api/message`;


export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_ERROR = 'GET_MESSAGES_ERROR';
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR';
export const SELECT_USER = 'SELECT_USER';

export const getMessagesRequest = () => ({
    type: GET_MESSAGES_REQUEST,
});

export const sendMessagesRequest = () => ({
    type: SEND_MESSAGE_REQUEST,
});

export const getMessagesSuccess = (messages) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: messages,
});

export const getMessagesError = (error) => ({
    type: GET_MESSAGES_ERROR,
    payload: error,
});

export const sendMessageSuccess = (message) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: message,
});

export const sendMessageError = (error) => ({
    type: SEND_MESSAGE_ERROR,
    payload: error,
});
export const selectUser = (user) => ({
    type: SELECT_USER,
    payload: user,
});

export const getMessages = () => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');
        const messages = getState().chat.messages;

        if (!getState().chat.isLoading && token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(getMessagesRequest());

            axios
                .get(`${messagesEndpoint}`, {headers})
                .then((response) => {
                    dispatch(getMessagesSuccess(response.data));
                })
                .catch((error) => {
                    dispatch(getMessagesError(error));
                });
        }
    };
};

export const sendMessage = (messageData) => {
    return (dispatch, getState) => {
        const token = Cookies.get('token');

        if (!getState().chat.isLoading && token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            dispatch(sendMessagesRequest());
            axios
                .post(`${messagesEndpoint}`, messageData, {headers})
                .then((response) => {
                    dispatch(sendMessageSuccess(response.data));
                    dispatch(getMessages())
                })
                .catch((error) => {
                    dispatch(sendMessageError(error));
                });
        }
    };
};
