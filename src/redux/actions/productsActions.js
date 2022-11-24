import axios from "axios";
import { PRODUCTS_FAIL, PRODUCTS_SUCCESS, PRODUCTS_REQUEST } from "../../constants/productsConstants";

import { API_URL } from "../../constants/api";

export const products =
    (keyword = "", pageNumber = "") =>
    async dispatch => {
        try {
            dispatch({ type: PRODUCTS_REQUEST });
            const { data } = await axios.get(`${API_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
            dispatch({
                type: PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCTS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
