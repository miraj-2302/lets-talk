import { createSlice } from '@reduxjs/toolkit'

export const activeSettingSlice = createSlice({
  name: "active",
  initialState: {
   active:'nur islam'
  },
  reducers: {
    setting: (state, action) => {
     
     state.active = action.payload

    },
  
  }
})

export const {activeSetting } = activeSettingSlice.actions

export default activeSettingSlice.reducer