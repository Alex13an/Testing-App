import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../models/appModels'

interface dataState {
  categories: ICategory[]
}

const initialState: dataState = {
  categories: [] as ICategory[],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<dataState>) => {
      state.categories = [...action.payload.categories]
    },
  },
})

export const { setCategories } = dataSlice.actions

export default dataSlice.reducer
