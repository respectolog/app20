import { configureStore } from '@reduxjs/toolkit';
import graficReducer from '../features/sales/graficSlice';
import labelsReducer from '../features/sales/labelsSlice';

export const store = configureStore({
  reducer: {
    grafic: graficReducer,
    viz: labelsReducer,
  },
});
