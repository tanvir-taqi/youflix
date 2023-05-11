import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface GenreMovie{
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

interface GenreMoviesState {
    genreMovie: GenreMovie[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

const initialState:GenreMoviesState = {
    genreMovie:[],
    status:'idle',
    error:null
}

export const fetchGenreMovie = createAsyncThunk<GenreMovie[],number>('genreMovie/fetchGenreMovie', async(id)=>{
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const genreMovies = await response.json();
    return genreMovies.results;
})

const genreMovieSlice = createSlice({
    name: "genreMovie",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGenreMovie.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGenreMovie.fulfilled, (state, action: PayloadAction<GenreMovie[]>) => {
          state.status = 'succeeded';
          state.genreMovie = [...action.payload];
        })
        .addCase(fetchGenreMovie.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Something went wrong.';
        });
    },

})
export default genreMovieSlice.reducer

export const genreMovieSelector = ((state:{genreMovies:GenreMoviesState})=>state.genreMovies)