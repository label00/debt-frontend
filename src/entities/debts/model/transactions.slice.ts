import { createSlice } from '@reduxjs/toolkit';
import { Debt } from '../../../shared/api';
import { fetchDebts } from './transactions.actions';

export type DebtState = {
  debts: Debt[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: DebtState = {
  debts: [],
  loading: false,
  loaded: false,
  error: null,
}

const transactionsSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    * Загрузка списка долгов
    * */
    builder.addCase(fetchDebts.fulfilled, (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.debts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchDebts.pending, (state) => {
      state.loaded = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDebts.rejected, (state, action) => {
      state.debts = [];
      state.loaded = true;
      state.loading = false;
      state.error = action.payload as string;
    });
  }
})

export const debtReducer = transactionsSlice.reducer;
