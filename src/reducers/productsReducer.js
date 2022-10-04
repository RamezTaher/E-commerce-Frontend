import {
  PRODUCTS_FAIL,
  PRODUCTS_SUCCESS,
  PRODUCTS_REQUEST,
} from "../constants/productsConstants"

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { loading: true, products: [] }
    case PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
