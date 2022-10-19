import {
    DELETE_USERS_FAIL,
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    USERS_FAIL,
    USERS_REQUEST,
    USERS_SUCCESS,
} from "../../constants/users";

export const usersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return { ...state, loading: true };
        case USERS_SUCCESS:
            return { loading: false, users: action.payload };
        case USERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USERS_REQUEST:
            return { ...state, loading: true };
        case DELETE_USERS_SUCCESS:
            return { loading: false, success: true };
        case DELETE_USERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const updateUserReducer = (state = { user: {}, success: false }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return { loading: true };
        case UPDATE_USER_SUCCESS:
            return { loading: false, success: true };
        case UPDATE_USER_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_USER_RESET:
            return { user: {} };
        default:
            return state;
    }
};
