import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/categories";
import cartReducer from "../slices/cart";
import productReducer from "../slices/product";
import wishlistReducer from "../slices/wishlist";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
