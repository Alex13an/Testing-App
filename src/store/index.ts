import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterSlice from './reducers/counterSlice'

const RootReducer = combineReducers({
  counterSlice,
})

export const store = configureStore({
  reducer: {
    RootReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch

export default store
