import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

interface TrendingVideoDataTypes {
    video: {
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: string
        type: string
        official: boolean
        published_at: string
        id: string
    }
}

const TrendingDetails = () => {
    const trending: any = useLoaderData()
    const [trendingVideo, setTrendingVideo] = useState<TrendingVideoDataTypes>()
    const { original_name, poster_path, tagline, first_air_date, genres, overview, number_of_seasons, number_of_episodes, id, homepage, seasons } = trending
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const trailer = data?.results.find((mv: any) => mv.type === "Trailer")
                setTrendingVideo(trailer)
            })
    }, [id])
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <div>
            <div className=''>
                <iframe title="movie-trailer" 
                width="100%" 
                src={`https://www.youtube.com/embed/${trendingVideo?.video?.key}`} 
                allowFullScreen
                ></iframe>
            </div>
            <div className='md:grid flex flex-col-reverse md:grid-cols-2'>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className=' md:max-w-[700px] md:max-h-[600px] h-full w-full filter brightness-75' alt="Movie poster" />
                <div className='flex flex-col items-start md:p-20 p-4 justify-center text-left space-y-6'>
                    <h3 className='text-3xl'>{original_name}</h3>
                    <p className='text-gray-400'>{tagline}</p>
                    <div>
                        {
                            genres.map((gn: { id: number; name: string; }) => <p key={gn.id} className='border border-red-600 px-4 py-1 rounded-2xl'>{gn?.name}</p>)
                        }
                    </div>
                    <p className=''>Since: {first_air_date} </p>
                    <p className=''>Total Season: {number_of_seasons} <span>Total Episode: {number_of_episodes}</span> </p>

                    <p className='flex  flex-wrap'>{overview}</p>
                   
                    <a target="_blank" rel="noopener noreferrer" href={homepage} className='font-semibold text-xl watch-movie'>Watch Full Series</a>
                </div>
            </div>
            <div>
                        {
                            seasons?.map((season: any) => <div key={season.id} className='grid  grid-cols-1 md:grid-cols-4 justify-center items-center p-20 md:p-3'>
                                <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt="" className='md:w-96 md:h-96' />
                                <p>Season {season.season_number}</p>
                                <p>Total episode : {season.episode_count}</p>
                                <p>{season.overview}</p>

                            </div>)
                        }
                    </div>
        </div>
    );
};

export default TrendingDetails;