import {
  POST_ORDERS_FAIL,
  POST_ORDERS_REQUEST,
  POST_ORDERS_SUCCESS,
} from "../../constants/orderConstants"

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case POST_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      }
    case POST_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
