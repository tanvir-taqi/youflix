import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './MovieDetails.css'


interface videoDataTypes {
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

const MovieDetails = () => {
    const movie: any = useLoaderData()
    const [videoData, setVideoData] = useState<videoDataTypes>()


    const { original_title, poster_path, tagline, runtime, release_date, genres, overview, id,homepage } = movie

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const trailer = data?.results.find((mv: any) => mv.type === "Trailer")
                setVideoData(trailer)
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
                src={`https://www.youtube.com/embed/${videoData?.video?.key}`} 
                allowFullScreen
                ></iframe>
            </div>
            <div className='md:grid flex flex-col-reverse md:grid-cols-2'>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className=' md:max-w-[700px] md:max-h-[600px] h-full w-full filter brightness-75' alt="Movie poster" />
                <div className='flex flex-col items-start md:p-20 p-4 justify-center text-left space-y-6'>
                    <h3 className='text-3xl'>{original_title}</h3>
                    <p className='text-gray-400'>{tagline}</p>
                    <div>
                        {
                            genres.map((gn: { id: number; name: string; }) => <p key={gn.id} className='border border-red-600 px-4 py-1 rounded-2xl'>{gn?.name}</p>)
                        }
                    </div>
                    <p className=''>Runtime:{runtime}min <span className='mx-5'>Released On: {release_date}</span></p>
                    <p className='flex  flex-wrap'>{overview}</p>
                    <a target="_blank" rel="noopener noreferrer" href={homepage} className='font-semibold text-xl watch-movie'>Watch Full Movie</a>
                </div>
            </div>

        </div>
    );
};

export default MovieDetails;
