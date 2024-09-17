import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWorkers } from '../gateways/index';
export interface Worker {
  id?: string;
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  birthDate: string;
  position: string;
  tag: string;
}

interface WorkersState {
  workers: Worker[];
  sortCriteria: 'alphabet' | 'birthday';
  status: 'ok' | 'loading' | 'success' | 'failed';
  error: string | null;
  sortPosition: 'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios';
}

const initialState: WorkersState = {
  workers: [],
  sortCriteria: 'alphabet',
  status: 'ok',
  error: null,
  sortPosition: 'everybody'
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkers: (state, action: PayloadAction<Worker[]>) => {
      state.workers = action.payload;
    },
    setSortCriteria: (state, action: PayloadAction<'alphabet' | 'birthday'>) => {
      state.sortCriteria = action.payload;
    },
    setSortPosition: (
      state,
      action: PayloadAction<'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios'>
    ) => {
      state.sortPosition = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWorkers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<Worker[]>) => {
        state.status = 'success';
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch workers';
      });
  }
});

export const { setWorkers, setSortCriteria, setSortPosition } = workersSlice.actions;

export default workersSlice.reducer;
