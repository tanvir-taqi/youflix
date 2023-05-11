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
        original_title?: string
        title?: string
        original_name?: string
        name?: string
        popularity: number
        poster_path: string
        release_date?: string
        first_air_date?: string
        video: boolean
        vote_average: number
        vote_count: number
    }
    category: string
}
const SingleMovieCard = (props: SingleMovieProps) => {
    const { poster_path, original_title ,release_date,id,original_name,first_air_date} = props.movie
    const {category} = props
    return (
        <Link to={`/${category}/${id}`} className='cursor-pointer duration-500 hover:scale-90'>
            <div className='relative '>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='w-96 h-96 filter brightness-75 ' alt="Movie poster" />

                <div className=' absolute inset-0 transition-opacity duration-500  bg-[#000000ec] opacity-0 hover:opacity-100'>
                    <div className='w-full h-full flex justify-center items-center flex-col text-white'>
                        <h3 className='text-2xl '>{original_title ? original_title : original_name}</h3>
                        <br />
                        <p>Release Date: {release_date ? release_date : first_air_date}</p>
                    </div>
                    <div className="scanner "></div>
                </div>
            </div>
        </Link>
    );
};

export default SingleMovieCard;