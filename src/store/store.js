import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../utils/mainAppSlice';

export const store = configureStore({
  reducer: {
    appSlice: appReducer,
  },
});
