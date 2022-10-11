import { SHIPPING_SAVE_ADDRESS } from "../constants/shippingsConstants"

export const shippingReducer = (state = {shippingAddress:{}}, action) => {
  switch (action.type) {
    case SHIPPING_SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    default:
      return state
  }
}
