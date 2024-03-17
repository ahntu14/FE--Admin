const initialState = {
    selectedProduct: null,
};

export const SELECT_PRODUCT = 'SELECT_PRODUCT';

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload,
            };
        default:
            return state;
    }
};

export default productsReducer;
