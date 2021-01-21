import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: "root",
  initialState: {
    base: small,
  },
  reducers: {
    chooseBase: (state, action) => { state.base = action.payload },
  }
});

export const reducer = rootSlice.reducer;

export const { chooseBase } = rootSlice.actions;
