import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITest, ITestCreate, ITestFull, ITests } from '../../models/appModels'
import { RootState } from '..'
import { SortTestParams, TestParams } from '../../models/fetchModels'

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/test',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).RootReducer.authSlice.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => ({
    fetchAllTests: build.query<ITests, SortTestParams>({
      query: ({ categoryId, sort, sortType, limit, page }) => ({
        url: '/',
        params: {
          categoryId,
          sort,
          sortType,
          limit,
          page,
        },
      }),
    }),
    fetchTest: build.query<ITestFull, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
    createTest: build.mutation<ITest, ITestCreate>({
      query: test => ({
        url: '/',
        method: 'POST',
        body: test,
      }),
    }),
  }),
})
