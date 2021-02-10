import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialValue: 0,
  name: 'qammar raza'
}

const initialSlice = createSlice({
  name: 'initialReducer',
  initialState,
  reducers: {
    increment(state) {
      state.initialValue++
    },
    decrement(state) {
      state.initialValue--
    }
  }
});

export const { increment, decrement } = initialSlice.actions;
export default initialSlice.reducer;