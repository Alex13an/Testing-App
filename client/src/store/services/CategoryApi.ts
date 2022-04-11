import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../../models/appModels'
import { RootState } from '..'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/category',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).RootReducer.authSlice.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    fetchAllCategories: build.query<ICategory[], null>({
      query: () => ({
        url: '/',
      }),
      providesTags: ['Category'],
    }),
    addCategory: build.mutation<ICategory, { name: string }>({
      query: name => ({
        url: '/',
        method: 'POST',
        body: name,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})
