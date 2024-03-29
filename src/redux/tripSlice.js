import { createSlice } from "@reduxjs/toolkit";

import initialState from "../assets/trips.json";

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip(state, action) {
      return [ ...state, action.payload];
    },
  },
});

export const tripsReducer = tripSlice.reducer;
export const { addTrip } = tripSlice.actions;
