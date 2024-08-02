import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './workersSlice';

export const store = configureStore({
  reducer: {
    workers: workersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
