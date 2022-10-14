import {
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
} from "../../constants/productConstants"

export const productReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { loading: true, data: [] }
    case PRODUCT_SUCCESS:
      return { loading: false, data: action.payload }
    case PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
