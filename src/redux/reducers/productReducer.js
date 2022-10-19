import {
    PRODUCT_FAIL,
    PRODUCT_SUCCESS,
    PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../../constants/productConstants";

export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { loading: true, data: [] };
        case PRODUCT_SUCCESS:
            return { loading: false, data: action.payload };
        case PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { loading: true, success: false };
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, success: true };
        case DELETE_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
