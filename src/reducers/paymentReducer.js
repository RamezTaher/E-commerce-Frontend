import { PAYMENT_SAVE_METHOD } from "../constants/paymentConstants"

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_SAVE_METHOD:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
