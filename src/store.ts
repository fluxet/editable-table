import { configureStore } from '@reduxjs/toolkit';
import tableSlice from './tableSlice';


const store = configureStore({
  reducer: {
    table: tableSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
