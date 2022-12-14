import {
    PRODUCT_FAIL,
    PRODUCT_SUCCESS,
    PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    POST_PRODUCT_REQUEST,
    POST_PRODUCT_SUCCESS,
    POST_PRODUCT_FAIL,
    POST_PRODUCT_RESET,
    PUT_PRODUCT_REQUEST,
    PUT_PRODUCT_SUCCESS,
    PUT_PRODUCT_FAIL,
    PUT_PRODUCT_RESET,
} from "../../constants/productConstants";

export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return { loading: true };
        case PRODUCT_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const deleteProductReducer = (state = { success: false }, action) => {
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

export const postProductReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case POST_PRODUCT_REQUEST:
            return { loading: true };
        case POST_PRODUCT_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case POST_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case POST_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const putProductReducer = (state = { success: false, product: {} }, action) => {
    switch (action.type) {
        case PUT_PRODUCT_REQUEST:
            return { loading: true };
        case PUT_PRODUCT_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PUT_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        case PUT_PRODUCT_RESET:
            return { product: {} };
        default:
            return state;
    }
};
