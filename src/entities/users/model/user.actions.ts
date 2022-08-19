import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../shared/api/users/users-api';
import { User } from '../../../shared/api';
import { RootState } from '../../index';

// fixme: запрос пользыватель должен быть только один раз. (Во время запроса данных из стейта)
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string, state: RootState }>(
  '[Users/API] fetch users',
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch {
      return rejectWithValue('Что-то пошло не так');
    }
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState();
      const { loaded, loading, succeeded } = users;
      if (succeeded || !loaded || loading) {
        return false
      }
    },
    dispatchConditionRejection: true,
  }
)
