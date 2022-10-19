import axios from "axios";
import { API_URL } from "../../constants/api";
import {
    DELETE_USERS_FAIL,
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USERS_FAIL,
    USERS_REQUEST,
    USERS_SUCCESS,
} from "../../constants/users";

export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USERS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/users`, config);

        dispatch({
            type: USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deleteUser = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_USERS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

        const { data } = await axios.delete(`${API_URL}/api/users/${id}`, config);

        dispatch({
            type: DELETE_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const updateUser = user => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
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

        const { data } = await axios.put(`${API_URL}/api/users/${user._id}`, user, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
