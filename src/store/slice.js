import { createSlice } from "@reduxjs/toolkit";

export const propSlice = createSlice({
  name: "counter",
  initialState: {
    property: "domesticViolence"
  },
  reducers: {
    setProperty: (state, action) => {
      state.property = action.payload;
    }
  }
});

export const { setProperty } = propSlice.actions;

export default propSlice.reducer;
