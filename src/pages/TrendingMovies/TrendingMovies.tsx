import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrendingMovies, selectTrendingMovies } from '../../features/movies/trendingMoviesSlice';
import SingleMovieCard from '../Home/SingleMovieCard';

const TrendingMovies = () => {
    const trendingMovies = useAppSelector(selectTrendingMovies)
    const dispatch = useAppDispatch();

    useEffect(() => {
         dispatch(fetchTrendingMovies())
    },[dispatch]);

    return (
        <div>
            <div className='my-24'>
                <h1 className='text-4xl font-extrabold text-white text-start my-6 mx-2 md:mx-6'>Trending Show This Week</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 '>
            {
                trendingMovies?.movies.map((movie,i) => <SingleMovieCard category='tv' key={i} movie={movie}></SingleMovieCard>)
            }
            </div>
            </div>
            
        </div>
    );
};

export default TrendingMovies;