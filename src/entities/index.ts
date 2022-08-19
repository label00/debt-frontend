import { configureStore } from '@reduxjs/toolkit';
import { debtReducer } from './debts';
import { usersReduce } from './users';

export * from './debts';
export * from './users';

export const store = configureStore({
  reducer: {
    debt: debtReducer,
    users: usersReduce,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
