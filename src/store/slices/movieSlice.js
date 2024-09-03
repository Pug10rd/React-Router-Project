// movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteMovies: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setFavoriteMovies: (state, action) => {
      state.favoriteMovies = action.payload;
    },
    removeFavoriteMovies(state) {
      state.favoriteMovies = [];
    },
  },
});

export const { setFavoriteMovies, removeFavoriteMovies } = movieSlice.actions;
export default movieSlice.reducer;
