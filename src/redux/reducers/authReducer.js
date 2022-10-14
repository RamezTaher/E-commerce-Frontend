import {
  LOGIN_FAIL,
  LOGIN_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../../constants/authConstants"

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true }
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case LOGIN_LOGOUT:
      return {}
    default:
      return state
  }
}

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true }
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
