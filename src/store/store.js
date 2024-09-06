import { configureStore } from "@reduxjs/toolkit";
import movieoSliceReducer from "./movieoSlice";

export const store = configureStore({
  reducer: {
    movieo: movieoSliceReducer,
  },
});
