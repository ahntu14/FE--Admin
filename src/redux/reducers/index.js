import { combineReducers } from 'redux';
import info from './infoReducer.js';
import selectedProduct from './productReducer.js';

const reducers = combineReducers({
    userInfo: info,
    selectedProduct: selectedProduct,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state, action) {
    return reducers(state, action);
}
