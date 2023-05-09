import React from 'react';
import { Link } from 'react-router-dom';


type SingleMovieProps = {
    key: number
    movie: {
        id: number
        adult: boolean
        backdrop_path: string
        genre_ids: number[]
        original_language: string
        original_title: string
        popularity: number
        poster_path: string
        release_date: string
        title: string
        video: boolean
        vote_average: number
        vote_count: number
    }
}
const SingleMovieCard = (props: SingleMovieProps) => {
    const { poster_path, original_title ,release_date,id} = props.movie
    return (
        <Link to={`/movie/${id}`} className='cursor-pointer '>
            <div className='relative '>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='w-96 h-96 filter brightness-75' alt="Movie poster" />

                <div className=' absolute inset-0 transition-opacity duration-500 bg-[#000000de] opacity-0 hover:opacity-100'>
                    <div className='w-full h-full flex justify-center items-center flex-col text-white'>
                        <h3 className='text-2xl '>{original_title}</h3>
                        <br />
                        <p>Release Date: {release_date}</p>
                    </div>
                    <div className="scanner "></div>
                </div>
            </div>
        </Link>
    );
};

export default SingleMovieCard;