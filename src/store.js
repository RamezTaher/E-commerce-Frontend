import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer } from "./reducers/productsReducer"
import { productReducer } from "./reducers/productReducer"

const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
