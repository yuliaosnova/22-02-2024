import { createSlice } from "@reduxjs/toolkit";

import initialState from "../assets/trips.json";

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip(state, action) {
      return [action.payload, ...state];
    },
  },
});

export const tripsReducer = tripSlice.reducer;
export const { addTrip } = tripSlice.actions;
