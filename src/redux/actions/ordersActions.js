import axios from "axios"
import { API_URL } from "../../constants/api"
import {
  POST_ORDER_SUCCESS,
  POST_ORDER_REQUEST,
  POST_ORDER_FAIL,
} from "../../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_ORDER_REQUEST,
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

    const { data } = await axios.post(`${API_URL}/api/orders`, order, config)

    dispatch({
      type: POST_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
