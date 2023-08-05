import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";

// combine Reducers
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { RootReducer } from "./reducers/RootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer" ] // only user will be persisted
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
