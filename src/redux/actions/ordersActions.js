import axios from "axios";
import { API_URL } from "../../constants/api";
import {
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST,
    POST_ORDER_FAIL,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_ORDER_REQUEST,
    PUT_ORDER_REQUEST,
    PUT_ORDER_SUCCESS,
    PUT_ORDER_FAIL,
    GET_ALLORDERS_REQUEST,
    GET_ALLORDERS_SUCCESS,
    GET_ALLORDERS_FAIL,
    ADMIN_GET_ALLORDERS_REQUEST,
    ADMIN_GET_ALLORDERS_SUCCESS,
    ADMIN_GET_ALLORDERS_FAIL,
    PUT_ORDER_DELIVER_SUCCESS,
    PUT_ORDER_DELIVER_REQUEST,
    PUT_ORDER_DELIVER_FAIL,
} from "../../constants/orderConstants";

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_ORDER_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/orders`, order, config);

        dispatch({
            type: POST_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: POST_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const getOrder = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDER_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/orders/${id}`, config);

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const putOrder = (id, paidRes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PUT_ORDER_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/orders/${id}/pay`, paidRes, config);

        dispatch({
            type: PUT_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PUT_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALLORDERS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/orders/myorders`, config);

        dispatch({
            type: GET_ALLORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALLORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const adminGetAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_GET_ALLORDERS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/orders`, config);

        dispatch({
            type: ADMIN_GET_ALLORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALLORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const putOrderDeliver = order => async (dispatch, getState) => {
    try {
        dispatch({
            type: PUT_ORDER_DELIVER_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/orders/${order._id}/deliver`, {}, config);

        dispatch({
            type: PUT_ORDER_DELIVER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PUT_ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
