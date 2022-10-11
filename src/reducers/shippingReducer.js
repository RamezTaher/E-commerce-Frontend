import { SHIPPING_SAVE_ADDRESS } from "../constants/shippingsConstants"

export const shippingReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING_SAVE_ADDRESS:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
