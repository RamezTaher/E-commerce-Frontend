import {
  POST_ORDER_FAIL,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../../constants/orderConstants"

export const createOrderReducer = (state = {}, action) => {
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
export const getOrderReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case GET_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
