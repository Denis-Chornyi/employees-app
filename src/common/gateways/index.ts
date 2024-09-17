import { createAsyncThunk } from '@reduxjs/toolkit';


const baseUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers', async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch workers');
  }
  const data = await response.json();
  return data;
});