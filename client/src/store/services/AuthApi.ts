import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from './../../models/IUser'
import { RootState } from '..'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/user',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).RootReducer.authSlice.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    userAuth: build.query({
      query: () => ({
        url: '/auth',
      }),
    }),
    userRegister: build.mutation<
      { token: string; error: undefined } | { token: undefined; error: string },
      IUser
    >({
      query: user => ({
        url: '/registration',
        method: 'POST',
        body: user,
      }),
    }),
    userLogin: build.mutation<
      { token: string; error: undefined } | { token: undefined; error: string },
      IUser
    >({
      query: user => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})
