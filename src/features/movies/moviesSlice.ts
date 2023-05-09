import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';



interface Movie {
    id: number;
    adult:boolean,
    backdrop_path:string,
    genre_ids:number[],
    original_language:string,
    original_title:string,
    popularity:number,
    poster_path:string,
    release_date:string,
    title:string,
    video:boolean,
    vote_average:number,
    vote_count:number,
    
  }

interface MoviesState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};


export const fetchMovies = createAsyncThunk<Movie[]>('movies/fetchMovies', async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const movies = await response.json();
    
    return movies.results;
  });

// export const fetchMoviesAsync = createAsyncThunk('movies/fetchMovies', async () => {
//   const response = await fetchMovies();
//   return response.data;
// });

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = [...state.movies, ...action.payload];
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export default moviesSlice.reducer;

export const selectMovies = (state: { movies: MoviesState }) => state.movies;
export const selectMoviesStatus = (state: { movies: MoviesState }) => state.movies.status;
export const selectMoviesError = (state: { movies: MoviesState }) => state.movies.error;
