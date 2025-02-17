import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "../Reducers/favoriteSlice";
import productReducer from "../Reducers/productSlice";
import authReducer from "../Reducers/authSlice";
import cartReducer from "../Reducers/cartSlice";

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  products: productReducer,
  auth: authReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["favorites", "auth", "cart"],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
