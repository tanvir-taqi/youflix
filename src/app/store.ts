import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import moviesReducer from '../features/movies/moviesSlice';
import trendingMovieReducer  from '../features/movies/trendingMoviesSlice';
import genreReducer from '../features/genre/genreSlice';
import GenreMovieReducer from '../features/genre/GenreMovieSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movies: moviesReducer,
    trendingMovies: trendingMovieReducer,
    genre: genreReducer,
    genreMovies: GenreMovieReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
