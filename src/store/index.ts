import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import jobSlice from './jobSlice';

export default configureStore({
  reducer: {
    auth: userReducer,
    data: jobSlice,
  },
});
