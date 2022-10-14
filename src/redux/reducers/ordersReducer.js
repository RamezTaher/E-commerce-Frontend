import {
  POST_ORDER_FAIL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
} from "../../constants/orderConstants"

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        loading: true,
      }
    case POST_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      }
    case POST_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
