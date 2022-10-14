import {
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDERS_FAIL,
} from "../../constants/orderConstants"

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        loading: true,
      }
    case ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      }
    case ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
