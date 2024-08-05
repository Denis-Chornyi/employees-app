import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  tag: string;
  position: string;
  birthDate: string;
  email: string;
  phone: string;
}

interface WorkersState {
  workers: Worker[];
  sortCriteria: 'alphabet' | 'birthday';
  status: 'ok' | 'loading' | 'success' | 'failed';
  error: string | null;
  sortPosition: 'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios';
}

const baseUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkers = createAsyncThunk<Worker[]>('workers/fetchWorkers', async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch workers');
  }
  const data = await response.json();
  return data;
});

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
