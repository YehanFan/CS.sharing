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
import authReducer from "../features/auth/authSlice";
import readingListsReducer from "../features/readingLists/readingListsSlice";
import suggestedUsersReducer from "../features/suggestedUsers/suggestedUsersSlice";
import postsReducer from "../features/posts/postsSlice";


// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine multiple reducers into a single root reducer
const reducers = combineReducers({
  auth: authReducer,
  readingLists: readingListsReducer,
  suggestedUsers: suggestedUsersReducer,
  posts: postsReducer
});

// Create a persisted reducer with redux-persist configuration
const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store with configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor to handle persistence of Redux store
export let persistor = persistStore(store);

export default store;
