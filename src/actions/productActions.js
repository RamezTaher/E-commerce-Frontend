import axios from "axios"
import {
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
} from "../constants/productConstants"

import { API_URL } from "../constants/api"

export const product = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUEST })
    const { data } = await axios.get(`${API_URL}/api/products/${id}`)
    dispatch({
      type: PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
