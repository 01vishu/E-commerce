import { createSlice } from "@reduxjs/toolkit";
export const UPDATE_CART = "UPDATE_CART";
const initialState = {
    cart: [],
    total: 0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload._id);
            state.cart.push(action.payload);
        },

        removeFromCart: (state, action) => {
            const item = action.payload;
            const index = state.cart.findIndex((i) => i._id === item._id);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        incrementQty: (state, action) => {
            const item = action.payload;
            const index = state.cart.findIndex((i) => i._id === item._id);
            if (index !== -1) {
                state.cart[index].availableQuantity >= state.cart[index].qty &&
                    state.cart[index].qty++;
            }
        },
        decrementQty: (state, action) => {
            const item = action.payload;
            const index = state.cart.findIndex((i) => i._id === item._id);
            if (index !== -1) {
                state.cart[index].qty--;
            }
        },
        updateCart(state, action) {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = state.cart = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    updateCart,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectTotal = (state) => state.cart.total;
export default cartSlice.reducer;

// state.cart.filter((item) => item._id === action.payload._id) to increse