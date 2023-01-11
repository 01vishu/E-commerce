import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const persistConfig = {
    key: "root",
    storage,
};
const configReducers = combineReducers({
    cart: cartReducer,
});
const reducer = persistReducer(persistConfig, configReducers);

const store = configureStore({
    reducer: reducer,
    devTools: process.env.MODE !== "production",
    middleware: [thunk],
});

export default store;