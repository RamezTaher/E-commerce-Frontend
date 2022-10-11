import { SHIPPING_SAVE_ADDRESS } from "../constants/shippingsConstants"

export const saveShippingAddress = (form) => (dispatch) => {
  dispatch({
    type: SHIPPING_SAVE_ADDRESS,
    payload: form,
  })

  localStorage.setItem("shippingAddress", JSON.stringify(form))
}
