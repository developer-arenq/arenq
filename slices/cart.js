import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  total: 0,
  shipping: 0,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Load cart (Backend OR Guest cart) */
    initialCart: (state, action) => {
      const payload = action.payload;

      // ✅ Guest cart
      if (Array.isArray(payload)) {
        state.cartItems = payload;

        let subtotal = 0;
        payload.forEach((item) => {
          subtotal += item.total ?? item.price * item.quantity;
        });

        state.subtotal = subtotal;
        state.shipping = 0;
        state.total = subtotal;
        return;
      }

      // ✅ Backend cart
      state.cartItems = payload.savedcart || [];
      state.shipping = payload.shipping || 0;

      let subtotal = 0;
      state.cartItems.forEach((item) => {
        subtotal += item.total ?? item.price * item.quantity;
      });

      state.subtotal = subtotal;
      state.total = subtotal + state.shipping;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.total = 0;
      state.shipping = 0;
    },
  },
});

export const { initialCart, clearCart } = cart.actions;
export default cart.reducer;
