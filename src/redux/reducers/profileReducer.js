import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
} from "../../constants/profileConstants"

export const profileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true }
    case PROFILE_SUCCESS:
      return { loading: false, user: action.payload }
    case PROFILE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { loading: true }
    case PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
