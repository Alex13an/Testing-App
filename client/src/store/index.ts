import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './reducers/authSlice'
import { authApi } from './services/AuthApi'

const RootReducer = combineReducers({
  authSlice,
})

export const store = configureStore({
  reducer: {
    RootReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch

export default store
