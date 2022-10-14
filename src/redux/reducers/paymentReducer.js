import { PAYMENT_SAVE_METHOD } from "../../constants/paymentConstants"

export const paymentReducer = (state = { payementMethod: "" }, action) => {
  switch (action.type) {
    case PAYMENT_SAVE_METHOD:
      return {
        ...state,
        payementMethod: action.payload,
      }

    default:
      return state
  }
}
