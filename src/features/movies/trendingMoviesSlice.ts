import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TrendingMovie {
    id: number
    adult:boolean
    backdrop_path:string
    genre_ids:number[]
    original_language:string
    original_title:string
    popularity:number
    poster_path:string
    release_date:string
    title:string
    video:boolean
    vote_average:number
    vote_count:number
    
  }
interface TrendingMoviesState {
    movies: TrendingMovie[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: TrendingMoviesState = {
    movies: [],
    status: 'idle',
    error: null,
  };

export const fetchTrendingMovies = createAsyncThunk<TrendingMovie[]>('trending/fetchTrendingMovies', async ()=>{
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const movies = await response.json();
    return movies.results.splice(0,20);
})


 export const trendingMovieSlice = createSlice({
    name: 'trending',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action: PayloadAction<TrendingMovie[]>) => {
        state.status = 'succeeded';
        state.movies = [...action.payload];
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
    }
})

export default trendingMovieSlice.reducer
export const selectTrendingMovies = (state: { trendingMovies: TrendingMoviesState }) => state.trendingMovies;

