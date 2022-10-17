import { USERS_FAIL, USERS_REQUEST, USERS_SUCCESS } from "../../constants/users";

export const usersReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return { ...state, loading: true };
        case USERS_SUCCESS:
            return { loading: false, user: action.payload };
        case USERS_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
