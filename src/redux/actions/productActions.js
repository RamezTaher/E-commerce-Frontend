import axios from "axios";
import {
    PRODUCT_FAIL,
    PRODUCT_SUCCESS,
    PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from "../../constants/productConstants";

import { API_URL } from "../../constants/api";

export const product = id => async dispatch => {
    try {
        dispatch({ type: PRODUCT_REQUEST });
        const { data } = await axios.get(`${API_URL}/api/products/${id}`);
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteProduct = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/products/${id}`, config);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
