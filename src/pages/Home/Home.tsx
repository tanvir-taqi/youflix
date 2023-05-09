import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchMovies, selectMovies } from '../../features/movies/moviesSlice';

const Home = () => {
    const movies = useAppSelector(selectMovies)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(fetchMovies())
    },[dispatch]);

    console.log('====================================');
    console.log(movies);
    console.log('====================================');
    return (
        <div>
            Home
        </div>
    );
};

export default Home;