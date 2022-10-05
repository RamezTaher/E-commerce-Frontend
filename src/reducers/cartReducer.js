import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currentItem = action.payload

      const itemExists = state.cartItems.find(
        (item) => item.product === currentItem.product
      )

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === itemExists.product ? currentItem : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currentItem],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    default:
      return state
  }
}
