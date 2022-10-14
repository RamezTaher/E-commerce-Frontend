import { PAYMENT_SAVE_METHOD } from "../../constants/paymentConstants"

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({
    type: PAYMENT_SAVE_METHOD,
    payload: method,
  })

  localStorage.setItem("paymentMethod", JSON.stringify(method))
}
