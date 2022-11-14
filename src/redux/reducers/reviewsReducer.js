import {
    POST_REVIEW_FAIL,
    POST_REVIEW_REQUEST,
    POST_REVIEW_RESET,
    POST_REVIEW_SUCCESS,
} from "../../constants/reviewConstants";

export const postReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_REVIEW_REQUEST:
            return { loading: true };
        case POST_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case POST_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case POST_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
