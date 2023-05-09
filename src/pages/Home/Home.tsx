import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovies, selectMovies } from '../../features/movies/moviesSlice';
import SingleMovieCard from './SingleMovieCard';

const Home = () => {
    const movies = useAppSelector(selectMovies)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchMovies())
    },[]);
    console.log('====================================');
    console.log(movies.movies);
    console.log('====================================');

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-4 '>
            {
                movies?.movies.map((movie,i) => <SingleMovieCard key={i} movie={movie}></SingleMovieCard>)
            }
            </div>
        </div>
    );
};

export default Home;