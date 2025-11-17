import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return null;
    },
  },
});

// ✅ Export actions
export const { addFeed, removeFeed } = feedSlice.actions;

// ✅ Export reducer (not the slice object!)
export default feedSlice.reducer;
