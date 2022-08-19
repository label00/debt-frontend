import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDebts } from '../../../shared/api';

export const fetchDebts = createAsyncThunk(
  '[Debts/API] Load Debts',
  async (_, { rejectWithValue }) => {
    try {
      return await getDebts();
    } catch (e) {
      return rejectWithValue('Что-то пошло не так')
    }

  }
)
