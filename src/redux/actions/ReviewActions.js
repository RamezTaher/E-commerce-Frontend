import { POST_REVIEW_FAIL, POST_REVIEW_REQUEST, POST_REVIEW_SUCCESS } from "../../constants/reviewConstants";

export const postReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_REVIEW_REQUEST,
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

        const { data } = await axios.post(`${API_URL}/api/products/${productId}/reviews`, review, config);

        dispatch({
            type: POST_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: POST_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
