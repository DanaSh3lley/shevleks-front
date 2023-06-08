import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import favoriteReducer from './reducer/favoriteReducer';
import cartReducer from './reducer/cartReducer';
import messagesReducer from './reducer/messagesReducer';

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
