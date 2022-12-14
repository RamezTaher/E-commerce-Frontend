import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer } from "./reducers/productsReducer";
import { deleteProductReducer, postProductReducer, productReducer, putProductReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { loginReducer, registerReducer } from "./reducers/authReducer";
import { profileReducer, profileUpdateReducer } from "./reducers/profileReducer";
import { shippingReducer } from "./reducers/shippingReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import {
    adminGetAllOrdersReducer,
    createOrderReducer,
    getAllOrdersReducer,
    getOrderReducer,
    putOrderDeliverReducer,
    putOrderReducer,
} from "./reducers/ordersReducer";
import { deleteUserReducer, updateUserReducer, usersReducer } from "./reducers/usersReducer";
import { postReviewReducer } from "./reducers/reviewsReducer";

const reducer = combineReducers({
    productsList: productsReducer,
    productDetails: productReducer,
    deleteProduct: deleteProductReducer,
    postProduct: postProductReducer,
    putProduct: putProductReducer,
    cart: cartReducer,
    userLogin: loginReducer,
    userRegister: registerReducer,
    profile: profileReducer,
    profileUpdate: profileUpdateReducer,
    shippingAddress: shippingReducer,
    payment: paymentReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    putOrder: putOrderReducer,
    putOrderDeliver: putOrderDeliverReducer,
    getAllOrders: getAllOrdersReducer,
    adminGetOrders: adminGetAllOrdersReducer,
    users: usersReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    postReview:postReviewReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage },
    shippingAddress: shippingAddressFromLocalStorage,
    payment: { payementMethod: paymentMethodFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
