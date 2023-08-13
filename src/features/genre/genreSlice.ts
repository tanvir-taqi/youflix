import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface GenreType{
        id:number
        name:string
    
}
interface GenreState {
    genre:GenreType[],
    status: string,
    error: string | null
}
const initialState : GenreState = {
    genre:[],
    status: 'idle',
    error: null
}

export const fetchGenres = createAsyncThunk<GenreType[]>('genre/fetchGenres',async ()=>{
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }
    const genres = await response.json();
    return genres.genres;
})



const GenreSlice = createSlice({
    name:'genre',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGenres.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<GenreType[]>) => {
          state.status = 'succeeded';
          state.genre = [...action.payload];
        })
        .addCase(fetchGenres.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Something went wrong.';
        });
    }
})
export default GenreSlice.reducer

export const genreSelector = (state: { genre: GenreState }) => state.genre;
