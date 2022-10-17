import axios from "axios";
import { API_URL } from "../../constants/api";
import { USERS_FAIL, USERS_REQUEST, USERS_SUCCESS } from "../../constants/users";

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
