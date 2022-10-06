import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstants"

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
