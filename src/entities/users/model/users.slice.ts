import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../shared/api';
import { fetchUsers } from './user.actions';

type UserState = {
  users: User[];
  loading: boolean;
  loaded: boolean;
  succeeded: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  error: null,
  loaded: false,
  loading: false,
  succeeded: false,
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loaded = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.error = action.payload
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.succeeded = true;
      state.error = null;
      state.users = action.payload;
    })
  }

})

export const usersReduce = usersSlice.reducer;
