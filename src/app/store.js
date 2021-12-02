import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/sales/mainAppSlice';

export const store = configureStore({
  reducer: {
    appSlice: appReducer,
  },
});
