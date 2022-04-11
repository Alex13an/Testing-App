import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import dataSlice from './reducers/dataSlice'
import { authApi } from './services/AuthApi'
import { categoryApi } from './services/CategoryApi'
import { testsApi } from './services/TestsApi'

const RootReducer = combineReducers({
  authSlice,
  dataSlice,
})

export const store = configureStore({
  reducer: {
    RootReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(testsApi.middleware)
      .concat(categoryApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch

export default store
