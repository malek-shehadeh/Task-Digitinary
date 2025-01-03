import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.tasks.some((task) => task.id === action.payload.id);
      if (!exists) {
        state.tasks.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
