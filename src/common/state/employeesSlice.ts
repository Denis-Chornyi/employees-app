import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployees } from '../gateways/index';
export interface Employee {
  id?: string;
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  birthDate: string;
  position: string;
  tag: string;
}

interface EmployeeState {
  employees: Employee[];
  sortCriteria: 'alphabet' | 'birthday';
  status: 'ok' | 'loading' | 'success' | 'failed';
  error: string | null;
  sortPosition: 'everybody' | 'designer' | 'analyst' | 'manager' | 'android' | 'ios';
}

const initialState: EmployeeState = {
  employees: [],
  sortCriteria: 'alphabet',
  status: 'ok',
  error: null,
  sortPosition: 'everybody'
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
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
      .addCase(fetchEmployees.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'success';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
      });
  }
});

export const { setEmployees, setSortCriteria, setSortPosition } = employeesSlice.actions;

export default employeesSlice.reducer;
