import { createSlice } from '@reduxjs/toolkit'

export const commonserviceSlice = createSlice({
  name: 'commonservice',
  initialState: {
    value: 0,
    dropdown:false
  },
  reducers: {
    showDropdown: (state) => {
      state.dropdown = true
    },
    hideDropdown: (state) => {
      state.dropdown = false
    },
  },
})

export const { showDropdown,hideDropdown } = commonserviceSlice.actions


export const commonserviceReducer = commonserviceSlice.reducer;