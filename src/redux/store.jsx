import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import reduxStorage from "./storage";  // Ensure correct storage import (AsyncStorage or localStorage)
import { persistReducer, persistStore, FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST } from "redux-persist";


// Persist configuration
const persistConfig = {
  key: 'root',
  storage: reduxStorage,  // Make sure storage is properly configured
  whitelist: ['game'],  // Ensure 'game' is a valid slice in rootReducer
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with Redux Toolkit and Reactotron
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE, PERSIST],
      },
    })
});

export const persistor = persistStore(store);  // Persist the store

export default store;

