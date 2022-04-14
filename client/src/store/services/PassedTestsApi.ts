import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'
import { PassedTests } from '../../models/fetchModels'

export const passedTestsApi = createApi({
  reducerPath: 'passedTestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/passed',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).RootReducer.authSlice.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    // fetchAllTests: build.query<ITests, TestParams>({
    //   query: ({ categoryId, limit, page }) => ({
    //     url: '/',
    //     params: {
    //       categoryId,
    //       limit,
    //       page,
    //     },
    //   }),
    // }),
    // fetchTest: build.query<ITestFull, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `/${id}`,
    //   }),
    // }),
    addPassedTests: build.mutation<{ success: boolean }, PassedTests>({
      query: test => ({
        url: '/',
        method: 'POST',
        body: test,
      }),
    }),
  }),
})
