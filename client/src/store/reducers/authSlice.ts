import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface authState {
  isAuth: boolean
  email: string
  role: 'ADMIN' | 'USER'
  token: string
}

const initialState: authState = {
  isAuth: false,
  email: '',
  role: 'USER',
  token: '',
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
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
