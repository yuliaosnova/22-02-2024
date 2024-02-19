import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { tripsReducer } from "./tripSlice";
import { selectedTripReducer } from "./selectedTripSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["trips", "selectedTrip"],
};

const rootReducer = combineReducers({
  trips: tripsReducer,
  selectedTrip: selectedTripReducer,
});

const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
