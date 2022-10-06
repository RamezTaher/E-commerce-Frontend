import axios from "axios"
import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
} from "../constants/profileConstants"
import { API_URL } from "../constants/api"

export const getProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }

    const { data } = await axios.get(`${API_URL}/api/users/${id}`, config)

    dispatch({
      type: PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
