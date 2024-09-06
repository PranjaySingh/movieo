import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingData: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
  popularTvShows: [],
  onAirTvShows: [],
  imageUrl: "",
};

export const movieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setTrendingData: (state, action) => {
      state.trendingData = action.payload;
    },
    setPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload;
    },
    setOnAirTvShows: (state, action) => {
      state.onAirTvShows = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const {
  setTrendingData,
  setImageUrl,
  setNowPlayingMovies,
  setTopRatedMovies,
  setPopularTvShows,
  setOnAirTvShows,
} = movieoSlice.actions;

export default movieoSlice.reducer;
