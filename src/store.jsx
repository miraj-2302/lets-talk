import { configureStore } from '@reduxjs/toolkit'
import userSlice from './pages/slices/userSlice'
import activeChatSlice from './pages/slices/activeChatSlice'
import activeSettingSlice from './pages/slices/activeSettingSlice'
import activeNotificationSlice from './pages/slices/activeNotificationSlice'
// import notificationsSlice from './pages/slices/notificationsSlice'
export default configureStore({
  reducer: {
    userLoginInfo :userSlice,
    activeChat: activeChatSlice,
    // notifications:notificationsSlice
    activeSetting:activeSettingSlice,
    activeNotification:activeNotificationSlice
  }
})