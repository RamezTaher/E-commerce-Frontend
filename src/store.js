import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer } from "./reducers/productsReducer"
import { productReducer } from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"
import { loginReducer, registerReducer } from "./reducers/authReducer"
import { profileReducer } from "./reducers/profileReducer"

const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productReducer,
  cart: cartReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  profile: profileReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
  userLogin: { userInfo: userInfoFromLocalStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
