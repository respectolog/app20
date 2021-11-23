import { configureStore } from '@reduxjs/toolkit';
import graficReducer from '../features/sales/graficSlice';

export const store = configureStore({
  reducer: {
    grafic: graficReducer,
  },
});
