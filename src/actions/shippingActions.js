import { SHIPPING_SAVE_ADDRESS } from "../constants/shippingsConstants"

export const saveShippingAddress = (form) => (dispatch, getState) => {
  dispatch({
    type: SHIPPING_SAVE_ADDRESS,
    payload: form,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}