import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    data: [],
    recentData: [],
  },
  reducers: {
    saveData: (state, action) => {
      state.data = action.payload.data;
    },
    saveRecentData: (state, action) => {
      state.recentData = action.payload.recentData;
    },
  },
});

export const { saveData } = appSlice.actions;
export const { saveRecentData } = appSlice.actions;

export const getReduxData = (state) => state.app.data;
export const getRecentData = (state) => state.app.recentData;

export default appSlice.reducer;
