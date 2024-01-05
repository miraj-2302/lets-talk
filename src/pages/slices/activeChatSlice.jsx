import { createSlice } from '@reduxjs/toolkit'

export const activeChatSlice = createSlice({
  name: "active",
  initialState: {
   active:'nur islam'
  },
  reducers: {
    activeChat: (state, action) => {
     
     state.active = action.payload

    },
  
  }
})

export const {activeChat } = activeChatSlice.actions

export default activeChatSlice.reducer