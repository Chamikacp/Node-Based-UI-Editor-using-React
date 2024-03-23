import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import rootReducer from "./rootReducer";
import localStorage from "redux-persist/es/storage";

export type RootState = ReturnType<typeof reducers>;

// Combining Reducers
const combinedReducer = combineReducers({
  general: rootReducer,
});

const config = {
  debug: false,
  key: "root",
  storage: localStorage,
  timeout: 50000,
  blacklist: ["general"],
  rootReducer: combinedReducer,
};

const reducers = persistReducer<ReturnType<typeof combinedReducer>>(
  config,
  combinedReducer
);

// Creating Store
const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistor = persistStore(store);
const initializeStore = () => ({ persistor, store });

export default initializeStore;
