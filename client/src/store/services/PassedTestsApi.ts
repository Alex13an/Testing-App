import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '..'
import { CleanPassedTest, PassedTests, PassedTestsUser } from '../../models/fetchModels'

export const passedTestsApi = createApi({
  reducerPath: 'passedTestsApi',
  tagTypes: ['passed'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/passed',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).RootReducer.authSlice.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    getAllPassedTests: build.query<CleanPassedTest[], { userId: number }>({
      query: ({ userId }) => ({
        url: '/',
        params: {
          userId,
        },
      }),
    }),
    checkPassedTest: build.query<
      { check: boolean; result: number },
      { userId: number; testId: number }
    >({
      query: ({ userId, testId }) => ({
        url: `/test`,
        params: {
          userId,
          testId,
        },
      }),
      providesTags: ['passed'],
    }),
    fetchPassedTest: build.query<PassedTestsUser, { userId: number }>({
      query: ({ userId }) => ({
        url: `/user`,
        params: {
          userId,
        },
      }),
      providesTags: ['passed'],
    }),
    addPassedTests: build.mutation<{ success: boolean }, PassedTests>({
      query: test => ({
        url: '/',
        method: 'POST',
        body: test,
      }),
      invalidatesTags: ['passed'],
    }),
  }),
})
