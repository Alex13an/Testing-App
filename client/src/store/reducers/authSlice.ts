import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface authState {
  isAuth: boolean
  email: string
  role: 'ADMIN' | 'USER'
  token: string
  userId: number
}

const initialState: authState = {
  isAuth: false,
  email: '',
  role: 'USER',
  token: '',
  userId: 0,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<authState>) => {
      state.isAuth = true
      state.role = action.payload.role
      state.email = action.payload.email
      state.token = action.payload.token
      state.userId = action.payload.userId
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
