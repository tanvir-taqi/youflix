import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchGenres, genreSelector } from '../../features/genre/genreSlice';
import { fetchGenreMovie, genreMovieSelector } from '../../features/genre/GenreMovieSlice';
import SingleMovieCard from '../Home/SingleMovieCard';
import './Genre.css'
import Spinner from '../../Components/Spinner';

interface GenreType{
    id:number
    name:string
}

const Genre = () => {
    const genre = useAppSelector(genreSelector)
    const genreMovies = useAppSelector(genreMovieSelector)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchGenres())
    }, [dispatch])

    const handleMoviefetchbyId = (id:number)=>{
        dispatch(fetchGenreMovie(id))
        
    }
    const loading = genre.status === 'loading' || genreMovies.status === 'loading';
    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <div>

            <h1 className='text-4xl font-extrabold text-white text-start my-6 mx-2 md:mx-6'>All Genre</h1>
            <div className='flex flex-wrap w-full'>
            {
             genre?.genre?.map((gn:GenreType) => <button 
              key={gn?.id}
              className='px-3 py-1 border border-red-800 rounded-2xl mx-4 my-2 genre-btn'
              onClick={()=>handleMoviefetchbyId(gn?.id)}
              >{gn?.name}</button>)   
            }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 '>

            {
                genreMovies?.genreMovie.map(gnm => <SingleMovieCard category="movie" key={gnm?.id} movie={gnm}></SingleMovieCard> )
            }
            </div>
            </div>
        </div>
    );
};

export default Genre;