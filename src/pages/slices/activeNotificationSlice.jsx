import { createSlice } from '@reduxjs/toolkit'

export const activeNotificationSlice = createSlice({
  name: "active",
  initialState: {
   active:'nur islam'
  },
  reducers: {
    Notification: (state, action) => {
     
     state.active = action.payload

    },
  
  }
})

export const {activeNotification } = activeNotificationSlice.actions

export default activeNotificationSlice.reducer